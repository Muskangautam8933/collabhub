import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";

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

/**
 * Get filter values
 * -----------------------
 * Fetches filter values of a filter inside a project
 */
export default function getFilterValues(
  projectId: string,
  filterId: string
) {
  return apiFetch<FilterValue[]>({
    url: `${SERVER_URL}/api/projects/${projectId}/filterValues?filterId=${filterId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}