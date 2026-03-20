import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function deleteProject(projectId?: string) {
  if (!projectId) throw new Error("projectId is required");

  return apiFetch({
    url: `${SERVER_URL}/api/projects/${projectId}`,
    method: "DELETE",
  });
}
