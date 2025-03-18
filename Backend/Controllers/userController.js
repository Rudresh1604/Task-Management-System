require("dotenv").config();
const Agent = require("../Models/agent");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { parseCSVAndDistribute } = require("../utils/csvProcessor");
const Tasks = require("../Models/tasks");

const jwtKey = process.env.JWT_KEY;

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    if (!name || !email || !password) {
      return res.status(400).send("Please enter all fields");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      console.log(user);

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).send("Something went wrong !");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    if (!email || !password) {
      throw new Error("Required email and password");
    }
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      let token = jwt.sign({ userId: user._id }, jwtKey, {
        expiresIn: "3hr",
      });

      token = jwt.sign({ userId: user._id, role: user.role }, jwtKey, {
        expiresIn: "3hr",
      });
      console.log(user);
      console.log(token);

      return res.status(200).send({
        message: "Log in successfully",

        token: token,
      });
    }
    return res.status(401).send("Invalid Email or Password");
  } catch (error) {
    console.log(error);

    return res.status(401).send(error.message);
  }
};

const addAgentsController = async (req, res) => {
  const { userId, name, email, phone, password } = req.body;
  console.log(req.body);

  try {
    if (!name || !email || !phone || !password) {
      return res.status(400).send("Please enter all fields");
    }
    const agentExist = await Agent.findOne({ email });
    if (agentExist) {
      return res.status(400).send("Agent already exists");
    }
    const agent = await Agent.create({
      userId: userId,
      name,
      phone,
      email,
      password,
    });
    if (agent) {
      return res.status(201).json({
        success: true,
        _id: agent._id,
        name: agent.name,
        email: agent.email,
      });
    } else {
      return res.status(400).send("Something went wrong !");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const getAgentsController = async (req, res) => {
  try {
    const agents = await Agent.find()
      .populate({ path: "userId", select: "-password" })
      .select("-password");
    console.log(agents);

    if (!agents.length) {
      return res.status(400).send("No agents are present");
    }
    if (agents) {
      return res.status(201).json(agents);
    } else {
      return res.status(400).send("Something went wrong !");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const uploadFileController = async (req, res) => {
  const { userId } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Cloudinary file details
    const fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path, // Cloudinary URL
      uploadedAt: new Date(),
    };

    // Update user's uploaded files
    await User.findByIdAndUpdate(userId, {
      $push: { uploadedFiles: fileData },
    });

    // Distribute tasks from CSV
    const distributedTasks = await parseCSVAndDistribute(req.file.path, userId);
    // console.log(distributedTasks);

    return res
      .status(200)
      .json({ message: "File uploaded & processed", tasks: distributedTasks });
  } catch (error) {
    console.log("Error is ", error);

    return res.status(500).send(error.message);
  }
};

const getDetailController = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).send("Cant access please login");
    }
    const user = await User.findById(userId).select("-password");
    const task = await Tasks.find().populate("assignedTo").select("-password");
    return res.status(200).json({ user: user, tasks: task });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  registerController,
  loginController,
  getAgentsController,
  uploadFileController,
  addAgentsController,
  getDetailController,
};
