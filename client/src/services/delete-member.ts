import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function deleteMember(
  projectId?: string,
  memberId?: string,
) {
  return apiFetch({
    url: `${SERVER_URL}/api/projects/${projectId}/members/${memberId}`,
    method: "DELETE",
  });
}
