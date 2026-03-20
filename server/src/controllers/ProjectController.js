import ProjectRepo from "../repos/ProjectRepo.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {
  const project = await ProjectRepo.create({
    ...req.body,
    owner: req.user.userId,
  });

  if (!project) {
    throw new Error(
      JSON.stringify({ message: "Error creating project", status: 500 }),
    );
  }

  res.status(201).json(project);
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const projects = await ProjectRepo.findAll({
    owner: userId,
  });

  const joinedProjects = await ProjectRepo.getJoinedProjects(userId);

  res.json({ owned: projects, joined: joinedProjects });
});

export const getProject = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.user.userId;

  const project = await ProjectRepo.getProjectAndUserRole(projectId, userId);

  res.json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const updated = await ProjectRepo.update(req.params.projectId, req.body);

  if (!updated) {
    throw new Error(
      JSON.stringify({ message: "Error updating project", status: 500 }),
    );
  }

  res.json(updated);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const deleted = await ProjectRepo.softDelete(req.params.projectId);

  if (!deleted) {
    throw new Error(
      JSON.stringify({ message: "Error deleting project", status: 500 }),
    );
  }

  res.json({ message: "Project deleted successfully" });
});
