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

type UpdateFilterPayload = {
  name: string;
  description?: string;
};

/**
 * Update Filter
 */
export default function updateFilter(
  projectId: string,
  filterId: string,
  payload: UpdateFilterPayload
) {
  return apiFetch<Filter, UpdateFilterPayload>({
    url: `${SERVER_URL}/api/projects/${projectId}/filters/${filterId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
    body: payload,
  });
}