import getInvites, { type Invite } from "@/services/get-invites";
import type { LoaderFunction } from "react-router";

export const accessControllerLoader: LoaderFunction = async ({ params }) => {
  const projectId = params.projectId;

  const invites = await getInvites(projectId);

  // const members = await getMembers(projectId);

  return { invites };
};

export type LoaderData = {
  invites: Promise<Invite[]>;
};
