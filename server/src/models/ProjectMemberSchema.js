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
    role: {
      type: String,
      enum: Object.values(PROJECT_ROLE),
      default: PROJECT_ROLE.READ,
    },
    invite: {
      type: mongoose.Types.ObjectId,
      ref: "Invite",
      required: [true, "invite is required"],
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

/**
 * Create Account model
 */
const Model = mongoose.model("ProjectMember", schema);

Model.syncIndexes();

export default Model;
