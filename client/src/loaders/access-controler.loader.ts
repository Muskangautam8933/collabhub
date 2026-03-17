import getInvites, { type Invite } from "@/services/get-invites";
import getMembers, { type Member } from "@/services/get-members";
import type { LoaderFunction } from "react-router";

export const accessControllerLoader: LoaderFunction = async ({ params }) => {
  const projectId = params.projectId;

  const invites = await getInvites(projectId);

  const members = await getMembers(projectId);

  return { invites, members };
};

export type LoaderData = {
  invites: Promise<Invite[]>;
  members: Promise<Member[]>;
};
