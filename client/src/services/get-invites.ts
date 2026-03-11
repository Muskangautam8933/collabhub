import { SERVER_URL } from "@/app.constatns";
// import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function getInvites(projectId?: string) {
  if (!projectId) throw new Error("projectId is required");
  return apiFetch({
    url: `${SERVER_URL}/api/projects/${projectId}/invites`,
    method: "GET",
  });
}
