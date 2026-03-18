import mongoose from "mongoose";
const taskFilterValueSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: [true, "task is required"],
  },
  filterValue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FilterValue",
    required: [true, "filterValue is required"],
  },
   assigner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "assigner is required"],
  },
});

taskFilterValueSchema.index({ task: 1, filterValue: 1 }, { unique: true });

const TFV = mongoose.model("TaskFilterValue", taskFilterValueSchema);
export default TFV;
