import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import localSpace from "./local-space";
import type { Project } from "./get-project";
/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/
export type Payload = {
  name: string;
  teamLimit: string;
};

/**
 * using network it fetch the data.
 */
export function postProject(payload: Payload) {
  return apiFetch<Project, Payload>({
    url: `${SERVER_URL}/api/projects`,
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
