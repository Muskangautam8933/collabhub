import Task from "../models/TaskSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function createTask(payload, projectId) {
  const createdTask = await Task.create({
    ...payload,
    project: ObjectId(projectId),
    filter: ObjectId(payload.filter),
    createdBy: ObjectId(payload.createdBy),
  });
  return createdTask;
}

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/

export async function getTasksByProject(projectId) {
  const ProjectTasks = await Task.find({ project: ObjectId(projectId) });
  return ProjectTasks;
}
export async function getTasksByFilter(filterId) {
  return await Task.find({ filter: ObjectId(filterId) });
}
export async function getTaskByTitle(title) {
  return await Task.find({
    title:title
  });
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

 export async function updateTask(taskId,updates) {
   const updatedTask = await Task.findOneAndUpdate({_id:ObjectId(taskId)},updates,{new:true,runValidators:true});
   return updatedTask
 }

/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/

 export async function deleteTask(taskId){
 const deletedTask =  await Task.findByIdAndDelete(taskId)
 return deletedTask;
 }
