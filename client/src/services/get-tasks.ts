import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import type { Task } from "./post-task";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function getTasks(projectId?: string) {
  if (!projectId) throw new Error("projectId is required");

  return apiFetch<Task[]>({
    url: `${SERVER_URL}/api/projects/${projectId}/tasks`,
    method: "GET",
  });
}
