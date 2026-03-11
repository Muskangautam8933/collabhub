import me, { type User } from "@/services/get-me";
import { createContext, type LoaderFunction } from "react-router";

export const userContext = createContext<User | null>(null);

export const rootLoader: LoaderFunction = async ({ context }) => {
  let user = null;
  try {
    user = await me();
    context.set(userContext, user);
  } catch (error) {
    context.set(userContext, null);
    console.error(error);
  }

  return { user };
};

export type LoaderData = {
  user: Promise<User | null>;
};
