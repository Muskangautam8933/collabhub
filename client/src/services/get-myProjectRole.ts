import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";
import type { User } from "./get-me";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/
export type UserWithRole = User & {
  role: string;
};
/**
 * Get participant chat
 * -----------------------
 *
 * using network it fetch the chat of a user.
 */
export default async function myProjectRole(projectId: string) {
  return apiFetch<UserWithRole>({
    url: `${SERVER_URL}/api/projects/${projectId}/role`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
