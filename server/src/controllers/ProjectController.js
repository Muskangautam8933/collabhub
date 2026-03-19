import ProjectRepo from "../repos/ProjectRepo.js";

export const createProject = async (req, res) => {
  const project = await ProjectRepo.create(req.body);
  if (!project) {
    throw new Error(JSON.stringify({ message: "Error creating project", status: 500 }));
  }
  res.status(201).json(project);
};

export const getAllProjects = async (req, res) => {
  const projects = await ProjectRepo.findAll();
  if (!projects) {
    throw new Error(JSON.stringify({ message: "Error fetching projects", status: 500 }));
  }
  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await ProjectRepo.findById(req.params.projectId);

  if (!project) {
    throw new Error(JSON.stringify({ message: "Project not found", status: 404 }));
  }

  res.json(project);
};

export const updateProject = async (req, res) => {
  const updated = await ProjectRepo.update(req.params.projectId, req.body);

  if (!updated) {
    throw new Error(JSON.stringify({ message: "Error updating project", status: 500 }));
  }

  res.json(updated);
};

export const deleteProject = async (req, res) => {
  const deleted = await ProjectRepo.softDelete(req.params.projectId);

  if (!deleted) {
    throw new Error(JSON.stringify({ message: "Error deleting project", status: 500 }));
  }

  res.json({ message: "Project deleted successfully" });
};