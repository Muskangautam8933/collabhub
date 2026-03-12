import { type User } from "@/services/get-me";
import getProjects from "@/services/get-projects";
import { type LoaderFunction } from "react-router";

export const projectsLoader: LoaderFunction = async () => {
  const projects = await getProjects();


  return { projects };
};

export type LoaderData = {
  projects: Promise<User | null>;
};
