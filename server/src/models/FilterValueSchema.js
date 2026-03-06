import mongoose from "mongoose";
const filterValueSchema = new mongoose.Schema(
  {
    filter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Filter",
      required: [true, "filter is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    color: String,
  },
  { timestamps: true },
);

const FilterValue = mongoose.model("FilterValue", filterValueSchema);
export default FilterValue;
