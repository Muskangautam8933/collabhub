import * as TFVRepo from "../repos/TaskFilterValueRepo.js";
import * as taskRepo from "../repos/TaskRepo.js";
import { withTransaction } from "../utils/withTransaction.js";

export const createTaskWithfilterValue = async (req, res, next) => {
  const { projectId } = req.params;
  const { filterValue, ...payload } = req.body;

  let task = null;

  await withTransaction(async (session) => {
    task = await taskRepo.createTask(payload, projectId, req.user.userId, {
      session,
    });

    await TFVRepo.create(filterValue, task._id, req.user.userId, { session });
  });

  res.status(201).json(task);
};

/**
 * ?filter=<filterId>
 * ?title=<title>&description=<description>&startDate=<startDate>&dueDate=<dueDate>
 */
export const getTasks = async (req, res) => {
  const { projectId } = req.params;

  const { filter, ...taskParams } = req.query;

  let tasks = await taskRepo.queryTasks(projectId, taskParams, filter);

  res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;

  const { title, description } = req.body;
  const updates = { title: title, description: description };

  const updatedRes = await taskRepo.updateTask(
    taskId,
    req.user.userId,
    updates,
  );
  res.status(200).json(updatedRes);
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const taskDeleted = await taskRepo.deleteTask(taskId, req.user.userId);
  res.status(200).json(taskDeleted);
};
