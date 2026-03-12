import { SERVER_URL } from "@/app.constatns";
// import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";
import type { User } from "./get-me";
import type { PROJECT_ROLE } from "@/pages/settings/useAccessControlPage";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/

export type Member = {
  _id: string;
  project: string;
  user: User;
  invite: string;
  role: PROJECT_ROLE;
  isDeleted: boolean;
  deletor: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

/**
 * using network it fetch the data.
 */
export default async function getMembers(projectId?: string) {
  if (!projectId) throw new Error("projectId is required");
  return apiFetch<Member[]>({
    url: `${SERVER_URL}/api/projects/${projectId}/members`,
    method: "GET",
  });
}
