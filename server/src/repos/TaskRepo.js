import Task from "../models/TaskSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export  async function createTask(payload,projectId) {
  const createdTask = await Task.create({
    ...payload,
    project: ObjectId(projectId),
    filter:ObjectId(payload.filter),
    createdBy:ObjectId(payload.createdBy)
  });
  return createdTask;
}

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/

export async function getTasksByProject(projectId){
 const ProjectTasks = await Task.find({project:ObjectId(projectId)})
 return ProjectTasks;
}
export async function getTasksByFilter(filterId){
  const filterTasks = await Task.find({filter:ObjectId(filterId)})
  return filterTasks;
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/
