import { SERVER_URL } from "../app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "../utils/api-fetch";

/*******************************************************************
 ******************************* Types *****************************
 *******************************************************************/

export type Response = undefined;

export type Payload = {
  filterValue: string;
};

/**
 * Create Filter Value
 */
export default function postTaskFilterValues(
  projectId: string,
  taskId: string,
  payload: Payload,
) {
  return apiFetch<Response, Payload>({
    url: `${SERVER_URL}/api/projects/${projectId}/tasks/${taskId}/taskfiltervalues`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
    body: payload,
  });
}
