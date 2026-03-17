import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function patchMemberRole(
  projectId?: string,
  memberId?: string,
  role?: string,
) {
  if (!projectId) throw new Error("projectId is required");
  if (!memberId) throw new Error("memberId is required");
  if (!role) throw new Error("role is required");
  return apiFetch({
    url: `${SERVER_URL}/api/projects/${projectId}/members/${memberId}?role=${role}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
