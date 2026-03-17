import { SERVER_URL } from "@/app.constatns";
import { apiFetch } from "@/utils/api-fetch";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

/**
 * using network it fetch the data.
 */
export default async function getChat(chatId: string) {
  return apiFetch({
    url: `${SERVER_URL}/chats/${chatId}`,
    method: "GET",
  });
}
