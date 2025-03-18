const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  filePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);
