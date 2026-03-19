import getProjects, { type ProjectsRes } from "@/services/get-projects";
import { type LoaderFunction } from "react-router";

export const projectsLoader: LoaderFunction = async () => {
  const projectsRes = await getProjects();

  console.log("projectsRes", projectsRes);
  return { projectsRes };
};

export type LoaderData = {
  projectsRes: Promise<ProjectsRes | null>;
};
