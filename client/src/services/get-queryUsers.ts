import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";
import type { User } from "./auth";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * Get participant chat
 * -----------------------
 *
 * using network it fetch the chat of a user.
 */
export async function getQueryUsers({
  name = "",
  email = "",
}: {
  name?: string;
  email?: string;
}) {
  return apiFetch<User[]>({
    url: `${SERVER_URL}/api/users?${name ? "name=" + name : ""}${email? "&email=" + email : ""}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
