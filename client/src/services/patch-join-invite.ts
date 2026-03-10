import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import localSpace from "./local-space";

export function patchJoinInvite(projectId: string, code: string) {
  return apiFetch({
    url: `${SERVER_URL}/api/projects/${projectId}/invites?code=${code}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
