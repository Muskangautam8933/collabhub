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
 * Update Filter
 */
export default function deleteFilter(
  projectId: string,
  filterId: string,
) {
  return apiFetch<Filter>({
    url: `${SERVER_URL}/api/projects/${projectId}/filters/${filterId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}