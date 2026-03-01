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
      default: "",
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "project",
      required: [true, "project is required"],
    },
    filter: {
      type: mongoose.Schema.ObjectId,
      ref: "filters",
      required: [true, "filter is required"],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "createdBy is required "],
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);
const task = mongoose.model("task", taskSchema);
export default task;
