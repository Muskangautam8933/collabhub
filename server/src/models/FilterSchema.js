import mongoose from "mongoose";
const filterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "filter should be unique"],
    },

    description: {
      type: String,
      default: null,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "project is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator is required"],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Filter = mongoose.model("Filter", filterSchema);
Filter.syncIndexes();
export default Filter;
