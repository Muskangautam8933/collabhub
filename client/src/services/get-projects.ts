import { SERVER_URL } from "@/app.constatns";
import localSpace from "./local-space";
import { apiFetch } from "@/utils/api-fetch";
import type { Project, ProjectWithOwner } from "./get-project";
import type { PROJECT_ROLE } from "@/pages/settings/useAccessControlPage";

/*******************************************************************
 *********************************** Types *************************
 *******************************************************************/
export type ProjectsRes = {
  owned: Project[];
  joined: JoinedProject[];
};

export type JoinedProject = ProjectWithOwner & { role: PROJECT_ROLE };

/**
 * Get participant chat
 * -----------------------
 *
 * using network it fetch the chat of a user.
 */
export default async function getProjects() {
  return apiFetch<ProjectsRes>({
    url: `${SERVER_URL}/api/projects`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localSpace.getAccessToken()}`,
    },
  });
}
