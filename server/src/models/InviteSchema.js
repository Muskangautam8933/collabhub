/**
 * Schema for MongoDB using Mongoose
 * Based on ER Diagram - Entity
 */

import mongoose from "mongoose";
import { INVITE_STATUS, PROJECT_ROLE } from "../common/constants.js";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "sender is required"],
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },

    project: {
      type: mongoose.Types.ObjectId,
      required: [true, "project is required"],
      ref: "Project",
    },

    role: {
      type: String,
      enum: Object.values(PROJECT_ROLE),
      default: PROJECT_ROLE.READ,
    },

    status: {
      type: String,
      enum: Object.values(INVITE_STATUS),
      default: INVITE_STATUS.PENDING,
    },
    code: {
      type: String,
      required: [true, "code is required"],
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },

    acceptedAt: {
      type: Date,
      default: null,
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

// Partial unique index
schema.index(
  {  project: 1, email: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

/**
 * Create Account model
 */
const Model = mongoose.model("Invite", schema);

Model.syncIndexes();

export default Model;
