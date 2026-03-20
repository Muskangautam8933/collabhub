import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";
import type { Project } from "./get-project";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function patchProject(
  projectId?: string,
  payload?: Partial<Project>,
) {
  if (!projectId) throw new Error("projectId is required");

  if (!payload) throw new Error("payload is required");

  return apiFetch<Project, Partial<Project>>({
    url: `${SERVER_URL}/api/projects/${projectId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
    body: payload,
  });
}
