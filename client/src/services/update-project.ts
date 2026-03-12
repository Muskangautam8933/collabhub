import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
}

export interface UpdateProjectResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    description: string;
    updatedAt: string;
  };
}

/**
 * Update project details
 * -----------------------
 * Updates the project name and/or description
 */
export default async function updateProject(
  projectId: string,
  payload: UpdateProjectPayload
): Promise<UpdateProjectResponse> {
  if (!projectId) throw new Error("projectId is required");

  return apiFetch<UpdateProjectResponse, UpdateProjectPayload>({
    url: `${SERVER_URL}/api/projects/${projectId}`,
    method: "PUT",
    body: payload,
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
