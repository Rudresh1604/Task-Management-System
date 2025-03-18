const fs = require("fs");
const axios = require("axios");
const csvParser = require("csv-parser");
const Task = require("../Models/tasks");
const Agent = require("../Models/agent");
const path = require("path");
const os = require("os");

const parseCSVAndDistribute = async (fileUrl, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: fileUrl,
        responseType: "stream",
      });

      const tempFilePath = path.join(os.tmpdir(), "temp.csv");
      const writer = fs.createWriteStream(tempFilePath);

      response.data.pipe(writer);
      writer.on("finish", async () => {
        try {
          console.log("File downloaded successfully:", tempFilePath);

          const records = [];
          fs.createReadStream(tempFilePath)
            .pipe(csvParser())
            .on("data", (row) => {
              console.log("Row is ", row);
              records.push(row);
            })
            .on("end", async () => {
              const agents = await Agent.find();
              console.log("Agents are ", agents);

              if (!agents || agents.length === 0) {
                return reject(new Error("No agents to distribute the task"));
              }

              let index = 0;
              for (let i = 0; i < records.length; i++) {
                await Task.create({
                  firstName: records[i].FirstName,
                  phone: records[i].Phone,
                  notes: records[i].Notes,
                  assignedTo: agents[index]._id,
                  filePath: fileUrl,
                  createdBy: userId,
                });

                index = (index + 1) % agents.length;
              }

              console.log("CSV processed and tasks distributed.");
              fs.unlinkSync(tempFilePath);
              resolve(records);
            });
        } catch (error) {
          reject(error);
        }
      });

      writer.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { parseCSVAndDistribute };
