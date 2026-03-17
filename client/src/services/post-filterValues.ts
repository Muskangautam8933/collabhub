import { SERVER_URL } from "../app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "../utils/api-fetch";

/*******************************************************************
 ******************************* Types *****************************
 *******************************************************************/
export interface FilterValue {
  _id: string;
  name: string;
  description: string;
  color: string;
  filter: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

type CreateFilterValuePayload = {
  name: string;
  description?: string;
  color?: string;
};

/**
 * Create Filter Value
 */
export default function createFilterValue(
  projectId: string,
  filterId: string,
  payload: CreateFilterValuePayload,
) {
  return apiFetch<FilterValue, CreateFilterValuePayload>({
    url: `${SERVER_URL}/api/projects/${projectId}/filterValues?filterId=${encodeURIComponent(filterId)}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
    body: payload,
  });
}
