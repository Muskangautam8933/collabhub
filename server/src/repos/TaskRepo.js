import Task from "../models/TaskSchema.js";
import { ObjectId } from "../utils/ObjectId.js";
import { handleMongoDbErrors } from "../utils/handleMongoDBError.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function createTask(payload, projectId, userId, options = {}) {
  const doc = new Task({
    ...payload,
    project: ObjectId(projectId),
    creator: ObjectId(userId),
  });
  return await handleMongoDbErrors(() => doc.save(options));
}

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/

export async function getTasksByProject(projectId) {
  const ProjectTasks = await Task.find({
    project: ObjectId(projectId),
  });
  return ProjectTasks;
}

export async function getTaskByTitle(title, userId) {
  return await Task.find({
    title: title,
    creator: ObjectId(userId),
  });
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

export async function updateTask(taskId, userId, updates) {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: ObjectId(taskId), creator: ObjectId(userId) },
    updates,
    { new: true, runValidators: true },
  );
  return updatedTask;
}

/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/

export async function deleteTask(taskId, userId) {
  const deletedTask = await Task.findOneAndDelete({
    _id: taskId,
    creator: ObjectId(userId),
  });
  return deletedTask;
}
