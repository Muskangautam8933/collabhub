import * as taskRepo from "../repos/TaskRepo.js";

export const taskCreate = async (req, res) => {
  const {projectId} = req.params;
  const created = await taskRepo.createTask(req.body,projectId);
  res.status(201).json(created);
};

export const getTasks = async (req,res)=>{
  const {projectId} = req.query;
 const ProjectTasks =  await taskRepo.getTasksByProject(projectId)
 res.status(200).json(ProjectTasks);
}
