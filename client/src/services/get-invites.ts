import { SERVER_URL } from "@/app.constatns";
// import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";
import type { User } from "./get-me";
import type { PROJECT_ROLE } from "@/pages/settings/useAccessControlPage";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/
export type Invite = {
  acceptedAt: string;
  code: string;
  createdAt: string;
  deletedAt: string | null;
  deletor: User | null;
  email: string;
  expireAt: string;
  isDeleted: boolean;
  project: string;
  receiver: User | null;
  role: PROJECT_ROLE;
  sender: User;
  status: string;
  _id: string;
};

/**
 * using network it fetch the data.
 */
export default async function getInvites(projectId?: string) {
  if (!projectId) throw new Error("projectId is required");
  return apiFetch<Invite[]>({
    url: `${SERVER_URL}/api/projects/${projectId}/invites?status=pending`,
    method: "GET",
  });
}
