import mongoose from "mongoose";
const filterValueSchema = new mongoose.Schema(
  {
    filter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Filter",
      required: [true, "filter is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },

    color: {
      type: String,
      default: "#000000",
    },
  },
  { timestamps: true },
);

const FilterValue = mongoose.model("FilterValue", filterValueSchema);
export default FilterValue;
