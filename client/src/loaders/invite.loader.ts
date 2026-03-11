import type { LoaderFunction } from "react-router";
import { userContext } from "./root.loader";
import type { User } from "@/services/get-me";

export const inviteLoader: LoaderFunction = async ({ context }) => {
  const user = context.get(userContext);

  if (!user) throw new Error("You are not logged in");
};

export type LoaderData = {
  user: User;
};
