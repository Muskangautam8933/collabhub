import Task from "../models/TaskSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function createTask(payload, projectId,userId) {
  const createdTask = await Task.create({
    ...payload,
    project: ObjectId(projectId),
    createdBy: ObjectId(userId),
  });
  return createdTask;
}  

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/

export async function getTasksByProject(projectId,userId) {
  const ProjectTasks = await Task.find({ project: ObjectId(projectId),createdBy:ObjectId(userId) });
  return ProjectTasks;
}

export async function getTaskByTitle(title,userId) {
  return await Task.find({
    title:title,
    createdBy:ObjectId(userId)
  });
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

 export async function updateTask(taskId,userId,updates) {
   const updatedTask = await Task.findOneAndUpdate({_id:ObjectId(taskId),
    createdBy:ObjectId(userId)
   },updates,{new:true,runValidators:true});
   return updatedTask
 }

/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/

 export async function deleteTask(taskId,userId){
 const deletedTask =  await Task.findOneAndDelete({_id:taskId,createdBy:ObjectId(userId)})
 return deletedTask;
 }
