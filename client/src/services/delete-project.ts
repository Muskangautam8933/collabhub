import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";

export interface DeleteProjectResponse {
  success: boolean;
  message: string;
}

/**
 * Delete a project
 * -----------------------
 * Permanently deletes the project. This action cannot be undone.
 */
export default async function deleteProject(
  projectId: string
): Promise<DeleteProjectResponse> {
  if (!projectId) throw new Error("projectId is required");

  return apiFetch<DeleteProjectResponse>({
    url: `${SERVER_URL}/api/projects/${projectId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
