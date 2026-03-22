import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import localSpace from "./local-space";
import type { Project } from "./get-project";
/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/
export type Task = {
  _id: string;
  title: string;
  description: string;
};

export type Payload = Task & {
  filterValue: string;
};

/**
 * using network it fetch the data.
 */
export function postTask(projectId?: string, payload?: Payload) {
  if (!projectId) throw new Error("projectId is required");
  if (!payload) throw new Error("payload is required");

  return apiFetch<Project, Payload>({
    url: `${SERVER_URL}/api/projects/${projectId}/tasks`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
    body: payload,
  });

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       _id: "1",
  //       email,
  //       role,
  //       status: "pending",
  //     } as Invite);
  //   }, 1000);
  // });
}
