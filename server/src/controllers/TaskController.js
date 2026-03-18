import Filter from "../models/filterSchema.js";
import FilterValue from "../models/FilterValueSchema.js";
import task from "../models/TaskSchema.js";
import * as TFVRepo from "../repos/TaskFilterValueRepo.js";
import * as taskRepo from "../repos/TaskRepo.js";
import { withTransaction } from "../utils/withTransaction.js";

export const taskCreate = async (req, res) => {
  const { projectId } = req.params;

  const created = await taskRepo.createTask(
    req.body,
    projectId,
    req.user.userId,
  );

  res.status(201).json(created);
};

export const createTaskWithfv = async (req, res, next) => {
  const { projectId } = req.params;
  const { filterValue } = req.body;

  let task = null;

  await withTransaction(async (session) => {
    task = await taskRepo.createTask(req.body, projectId, req.user.userId, {
      session,
    });

    await TFVRepo.create(filterValue, task._id, req.user.userId, { session });
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const { projectId } = req.params;
  const { title } = req.query;
  let tasks;
  if (title) {
    tasks = await taskRepo.getTaskByTitle(title, req.user.userId);
  } else {
    tasks = await taskRepo.getTasksByProject(projectId, req.user.userId);
  }
  res.status(200).json(tasks);
};

export const getTaskByFilter = async (req, res) => {
  const { projectId } = req.params;
  const { filter, value } = req.query;

  const filterDoc = await Filter.findOne({
    name: filter,
    project: projectId,
  });

  if (!filterDoc) {
    return res.status(404).json({ message: "Filter not found" });
  }

  const filterValueDoc = await FilterValue.findOne({
    name: value,
    filter: filterDoc._id,
  });

  if (!filterValueDoc) {
    return res.status(404).json({ message: "Filter value not found" });
  }

  const mappings = await TFV.find({
    filterValue: filterValueDoc._id,
  }).populate("task");

  const tasks = mappings.map((m) => m.task);

  res.status(200).json(tasks);
};

export const getTasksByFilterValue = async (req, res) => {
  let tasks;
  tasks = await TFVRepo.getTasksByFilterValue(
    task._id,
    filterValue,
    req.user.userId,
  );
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
