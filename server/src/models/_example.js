/**
 * Schema for MongoDB using Mongoose
 * Based on ER Diagram - Entity
 */

import mongoose from "mongoose";
import { PROJECT_ROLE } from "../common/constants.js";

const schema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      required: [true, "project is required"],
      ref: "Project",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    invite: {
      type: mongoose.Types.ObjectId,
      ref: "Invite",
      required: [true, "invite is required"],
    },
    role: {
      type: String,
      enum: Object.values(PROJECT_ROLE),
      default: PROJECT_ROLE.READ,
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
  { project: 1, user: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } },
);

/**
 * Create Account model
 */
const Model = mongoose.model("ModelName", schema);

Model.syncIndexes();

export default Model;
