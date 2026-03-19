import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: [30, "Name should not be more than 30 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: [500, "Description should not exceed 500 characters"],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "owner is required"],
      index: true,
    },


    teamLimit: {
      type: Number,
      default: 6,
      max: [6, "Team limit should not exceed 6"],
    },

    
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // automatically manages createdAt & updatedAt
  }
);

// Index for faster queries
ProjectSchema.index({ owner: 1, isDeleted: 1 });

const Project = mongoose.model("Project", ProjectSchema);

export default Project;