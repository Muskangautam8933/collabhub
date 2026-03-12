import type { LoaderFunction } from "react-router";
import { jwtDecode } from "jwt-decode";
import getInvite from "@/services/get-invite";
import type { Invite } from "@/services/get-invites";
import localSpace from "@/services/local-space";

export type Code = {
  email: string;
  exp: number;
  iat: number;
  project: string;
  role: string;
  sender: string;
};

export const inviteLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const inviteCode = url.searchParams.get("code");

  if (!inviteCode) throw new Error("invite code not found");

  localSpace.setInviteToken(inviteCode);

  const inviteCodePayload = jwtDecode<Code>(inviteCode);

  const invites = await getInvite(
    inviteCodePayload.project,
    inviteCodePayload.email,
  );

  const invite = invites[0];

  if (invite.status === "accepted") {
    localSpace.removeInviteToken();
    throw new Error("Invite already accepted");
  }
  console.log(inviteCode);
  return { invite, inviteCode };
};

export type LoaderData = {
  invite: Invite;
  inviteCode: string;
};
