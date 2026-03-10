import Project from "../models/ProjectSchema.js";
import {ObjectId} from "../utils/ObjectId.js";;

class ProjectRepo {

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
  async create(data) {
    return await Project.create(data);
  }

/************************************************************************
 **************************** FIND ALL  ************************************
 ************************************************************************/
  async findAll(owner) {
    const query = { isDeleted: false };
    if (owner) {
      query.owner = ObjectId(owner);
    }
    return await Project.find(query);
  }

/************************************************************************
 **************************** FIND BY ID ************************************
 ************************************************************************/
  async findById(id) {
    return await Project.findOne({ _id: ObjectId(id), isDeleted: false });
  }

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/
  async update(id, data) {
    return await Project.findByIdAndUpdate(ObjectId(id), data, { new: true });
  }

/************************************************************************
 **************************** SOFT DELETE ************************************
 ************************************************************************/
  async softDelete(id) {
    return await Project.findByIdAndUpdate(ObjectId(id), {
      isDeleted: true,
    });
  }
}

export default new ProjectRepo();