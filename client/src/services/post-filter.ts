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

type CreateFilterPayload = {
  name: string;
  description?: string;
};

/**
 * Create Filter
 */
export default function createFilter(
  projectId: string,
  payload: CreateFilterPayload
) {
  return apiFetch<Filter, CreateFilterPayload>({
    url: `${SERVER_URL}/api/projects/${projectId}/filters`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
    body: payload,
  });
}