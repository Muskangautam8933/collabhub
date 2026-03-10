import { projectChilds } from "@/_routes";

export function getFriendChildrenRoutes(): string[] {
  return projectChilds.filter((c) => !!c.path).map((child) => child.path!);
}
