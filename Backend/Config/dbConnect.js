require("dotenv").config();
const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB Connected successfully...");
  } catch (error) {
    console.log(error.mogoose);
  }
};
dbConnect();
