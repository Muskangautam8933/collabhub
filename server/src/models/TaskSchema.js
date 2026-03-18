import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "project",
      required: [true, "project is required"],
    },
    
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "creator is required "],
    },
    startDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
const task = mongoose.model("Task", taskSchema);
task.syncIndexes();

export default task;
