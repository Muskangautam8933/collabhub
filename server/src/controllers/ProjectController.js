import ProjectRepo from "../repos/ProjectRepo.js";


export const createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = await ProjectRepo.create({
    name,
    description,
    owner: req.user.userId,
  });
  res.status(201).json(project);
};

export const getAllProjects = async (req, res) => {
  // when user is authenticated, return their own projects by default
  const ownerFromQuery = req.query.owner;
  const owner = ownerFromQuery || (req.user && req.user.userId);
  const projects = await ProjectRepo.findAll(owner);
  return res.json(projects);
};

export const searchProjects = async (req, res) => {
  const { q } = req.query;
  const owner = req.user && req.user.userId;
  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }
  const projects = await ProjectRepo.search(owner, q);
  return res.json(projects);
};

export const getProject = async (req, res) => {
  try {
    const project = await ProjectRepo.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project" });
  }

  return res.json(project);
};

export const updateProject = async (req, res) => {
  const updated = await ProjectRepo.update(req.params.id, req.body);
  return res.json(updated);
};

export const deleteProject = async (req, res) => {
  await ProjectRepo.softDelete(req.params.id);
  return res.json({ message: "Project deleted successfully" });
};
