import { type User } from "@/services/get-me";
import getProject from "@/services/get-project";
import { type LoaderFunction } from "react-router";

export const projectLoader: LoaderFunction = async ({ params }) => {
  const projectId = params.projectId;

  const project = await getProject(projectId);
  console.log("project : ", project);

  return { project };
};

export type LoaderData = {
  project: Promise<User | null>;
};
