import localSpace from "./local-space";
import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import type { Task } from "./post-task";

/*******************************************************************
 ***************************** Types *******************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function patchTask(
  projectId: string,
  taskId: string,
  payload?: Partial<Task>,
) {
  if (!projectId) throw new Error("projectId is required");

  if (!payload) throw new Error("payload is required");

  return apiFetch<Task, Partial<Task>>({
    url: `${SERVER_URL}/api/projects/${projectId}/tasks/${taskId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
    body: payload,
  });
}
