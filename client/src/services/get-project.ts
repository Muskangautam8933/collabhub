import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

export type Project = {
  _id: string;
  name: string;
  description: string | null;
  owner: string;
  teamLimit: number;
  isDeleted: false;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

/**
 * Get participant chat
 * -----------------------
 *
 * using network it fetch the chat of a user.
 */
export default async function getProject(projectId?: string) {
  if (!projectId) throw new Error("projectId is required");
  return apiFetch({
    url: `${SERVER_URL}/api/projects/${projectId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
