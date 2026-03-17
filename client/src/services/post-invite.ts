import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import localSpace from "./local-space";
import type { Invite } from "./get-invites";

export function postInvite(projectId: string, email: string, role: string) {
  return apiFetch<Invite>({
    url: `${SERVER_URL}/api/projects/${projectId}/invites?email=${email}&role=${role}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
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
