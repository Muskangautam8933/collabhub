import mongoose from "mongoose";
const taskFilterValueSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  filterValue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FilterValue",
    required: true,
  },
   assignBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "created by is required"],
  },
});

taskFilterValueSchema.index({ task: 1, filterValue: 1 }, { unique: true });

const TFV = mongoose.model("TaskFilterValue", taskFilterValueSchema);
export default TFV;
