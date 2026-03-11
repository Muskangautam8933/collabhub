import { ROUTES } from "@/_routes.constants";
import type { Invite } from "@/services/get-invites";
import React from "react";
import { useLocation } from "react-router";

export default function useMain() {
  const location = useLocation();
  const [invites, setInvites] = React.useState<Invite[]>([]);

  const [activeTab, setActiveTab] = React.useState<string>("all");

  // SET ACTIVE TAB
  React.useEffect(() => {
    const path =
      location.pathname.split("/").filter(Boolean).at(-1) ?? "general";
    console.log(path);
    setActiveTab(path);
  }, [location.pathname]);

  const childRoutes = Object.values(ROUTES.PRIVATE.PROJECTS.SETTINGS).filter(
    (r) => r !== ROUTES.PRIVATE.PROJECTS.SETTINGS.ROOT,
  );

  return {
    activeTab,
    childRoutes,
    invites,
    setInvites,
  };
}
