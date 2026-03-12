import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import type { Invite } from "./get-invites";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function getInvite(
  projectId?: string,
  email?: string,
) {
  if (!projectId) throw new Error("projectId is required");
  if (!email) throw new Error("email is required");

  return apiFetch<Invite[]>({
    url: `${SERVER_URL}/api/projects/${projectId}/invites?email=${email}`,
    method: "GET",
  });
}
