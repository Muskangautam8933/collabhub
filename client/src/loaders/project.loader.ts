import{ type User } from "@/services/get-me";
import getProjects from "@/services/get-projects";
import { createContext, type LoaderFunction } from "react-router";

export const userContext = createContext<User | null>(null);

export const projectLoader: LoaderFunction = async ({ context }) => {
  const user = context.get(userContext);

  if (!user) throw new Error("You are not logged in");

  const res = await getProjects();

  console.log("projects : ", res);
};

export type LoaderData = {
  user: Promise<User | null>;
};
