import * as taskRepo from "../repos/TaskRepo.js";

export const taskCreate = async (req, res) => {
  const { projectId } = req.params;
  const created = await taskRepo.createTask(req.body, projectId);
  res.status(201).json(created);
};

export const getTasks = async (req, res) => {
  const { projectId } = req.params;
  const { filter, title } = req.query;
  let tasks;
  if (title) {
    tasks = await taskRepo.getTaskByTitle(title);
  } else if (filter) {
    tasks = await taskRepo.getTasksByFilter(filter);
  } else {
    tasks = await taskRepo.getTasksByProject(projectId);
  }
  res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;

  const { title, description } = req.body;
  const updates = { title: title, description: description };

  const updatedRes = await taskRepo.updateTask(taskId,updates)
  res.status(200).json(updatedRes)
};

export const deleteTask = async(req,res)=>{
  const {taskId} = req.params;
 const taskDeleted =   await taskRepo.deleteTask(taskId)
 res.status(200).json(taskDeleted)
};
