/**
 * Schema for MongoDB using Mongoose
 * Based on ER Diagram - Entity
 */

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      required: [true, "project is required"],
      ref: "Project",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 3,
      maxlength: 30,
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
  {
    timestamps: true,
    methods: {},
  },
);

schema.index(
  { project: 1, name: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } },
);

/**
 * Create Account model
 */
const Model = mongoose.model("Channel", schema);

Model.syncIndexes();

export default Model;
