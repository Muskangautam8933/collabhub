import { SERVER_URL } from "../app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "../utils/api-fetch";

/*******************************************************************
 ******************************* Types *****************************
 *******************************************************************/
export interface Filter {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}



/**
 * Create Filter
 */
export default function getFilter(projectId: string) {
  return apiFetch<Filter[]>({
    url: `${SERVER_URL}/api/projects/${projectId}/filters`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}