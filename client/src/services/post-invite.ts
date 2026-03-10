import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";
import localSpace from "./local-space";
import type { FriendRequest } from "./get-userProfile";

export function postInvite(projectId: string, email: string, role: string) {
  return apiFetch<FriendRequest>({
    url: `${SERVER_URL}/api/projects/${projectId}/invites?email=${email}&role=${role}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
