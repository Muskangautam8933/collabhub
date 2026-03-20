import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
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

schema.index(
  { project: 1, name: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } },
);

const Filter = mongoose.model("Filter", schema);

Filter.syncIndexes();

export default Filter;
