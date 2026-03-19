import Project from "../models/ProjectSchema.js";
import { ObjectId } from "../utils/ObjectId.js";
import { handleMongoDbErrors } from "../utils/handleMongoDBError.js";

class ProjectRepo {
  /************************************************************************
   **************************** CREATE ************************************
   ************************************************************************/
  async create(payload, options = {}) {
    const doc = new Project({
      ...payload,
      // add relations if needed like:
      // owner: ObjectId(payload.owner),
    });

    return await handleMongoDbErrors(() => doc.save(options));
  }

  /************************************************************************
   **************************** READ **************************************
   ************************************************************************/
  async findAll(filter, options = { session: null }) {
    return await Project.find({ ...filter, isDeleted: false }).session(
      options.session,
    );
  }

  async getJoinedProjects(userId, options = { session: null }) {
    if (!userId) throw new Error("userId is required");

    return await Project.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "projectmembers",
          let: { projectId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$project", "$$projectId"] },
                    { $eq: ["$user", ObjectId(userId)] },
                    { $eq: ["$isDeleted", false] },
                  ],
                },
              },
            },
          ],
          as: "member",
        },
      },
      {
        $match: {
          member: { $ne: [] },
        },
      },

      // ✅ Extract role
      {
        $addFields: {
          role: { $arrayElemAt: ["$member.role", 0] },
        },
      },

      // ✅ Populate owner
      {
        $lookup: {
          from: "users", // collection name
          localField: "owner", // field in Project
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true, // avoid crash if owner missing
        },
      },

      // ✅ Cleanup
      {
        $project: {
          member: 0,
        },
      },
    ]).session(options.session);
  }

  async findById(id, options = { session: null }) {
    if (!id) throw new Error("projectId is required");

    return await Project.findOne({
      _id: ObjectId(id),
      isDeleted: false,
    }).session(options.session);
  }

  async getProjectTeamLimit(projectId, options = { session: null }) {
    if (!projectId) throw new Error("projectId is required");

    const project = await Project.findOne({
      _id: ObjectId(projectId),
      isDeleted: false,
    })
      .select("teamLimit")
      .lean()
      .session(options.session);

    return project?.teamLimit;
  }

  /************************************************************************
   **************************** UPDATE ************************************
   ************************************************************************/
  async update(id, payload = {}, options = { session: null }) {
    if (!id) throw new Error("projectId is required");

    return await handleMongoDbErrors(() =>
      Project.findOneAndUpdate(
        { _id: ObjectId(id), isDeleted: false },
        {
          $set: {
            ...payload,
            // normalize refs if needed
            // owner: ObjectId(payload.owner),
          },
        },
        { new: true, session: options.session },
      ),
    );
  }

  async restoreById(id, payload = {}, options = { session: null }) {
    if (!id) throw new Error("projectId is required");

    return await handleMongoDbErrors(() =>
      Project.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            ...payload,
            isDeleted: false,
            deletedAt: null,
            deletor: null,
          },
        },
        { new: true, session: options.session },
      ),
    );
  }

  /************************************************************************
   **************************** DELETE ************************************
   ************************************************************************/
  async softDeleteById(id, deletor, options = { session: null }) {
    if (!id) throw new Error("projectId is required");
    if (!deletor) throw new Error("deletor is required");

    return await Project.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          isDeleted: true,
          deletor: ObjectId(deletor),
          deletedAt: new Date(),
        },
      },
      { session: options.session },
    );
  }
}

export default new ProjectRepo();
