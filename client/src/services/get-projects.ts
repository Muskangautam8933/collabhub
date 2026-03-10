import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * Get participant chat
 * -----------------------
 *
 * using network it fetch the chat of a user.
 */
export default async function getProjects() {
  return apiFetch({
    url: `${SERVER_URL}/api/projects`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
