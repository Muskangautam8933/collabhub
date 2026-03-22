import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import type { Task } from "./post-task";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/
export type Filter = {
  filterId: string;
  valueId: string;
  valueName: string;
  color: string;
};
export type Response = Task & {
  filters: Filter[];
};

/**
 * using network it fetch the data.
 */
export default async function getTasks(
  projectId?: string,
  filterId?: string,
  query?: Partial<Task>,
) {
  if (!projectId) throw new Error("projectId is required");

  const url = new URL(`/api/projects/${projectId}/tasks`, SERVER_URL);

  // Attach query params
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Attach filterId separately (if needed)
  if (filterId) {
    url.searchParams.append("filter", filterId);
  }

  return apiFetch<Response[]>({
    url,
    method: "GET",
  });
}
