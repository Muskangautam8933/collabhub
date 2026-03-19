import { ROUTES } from "@/_routes.constants";
import type { Invite } from "@/services/get-invites";
import getFilterValues, { type FilterValue } from "@/services/get-filterValues";
import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router";

export default function useMain() {
  const location = useLocation();
  const [invites, setInvites] = React.useState<Invite[]>([]);
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();

  const filterId = searchParams.get("filterId");

  const [activeTab, setActiveTab] = React.useState<string>("general");
  const [options, setOptions] = React.useState<FilterValue[]>([]);
  const [optionsLoading, setOptionsLoading] = React.useState(false);
  const [optionsError, setOptionsError] = React.useState<string | null>(null);

  async function getOptions() {
    console.log(projectId, filterId);
    if (!projectId || !filterId) return;

    try {
      setOptionsLoading(true);

      const res = await getFilterValues(projectId, filterId);

      setOptions(res);
      setOptionsError(null);
    } catch (error) {
      setOptionsError((error as Error).message);
    } finally {
      setOptionsLoading(false);
    }
  }

  /**
   * Fetch options when projectId or filterId changes
   */
  React.useEffect(() => {
    getOptions();
  }, [projectId, filterId]);

  /**
   * Detect active tab from URL
   */
  React.useEffect(() => {
    const path = location.pathname.split("/").filter(Boolean).at(-1) || "";

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
    options,
    optionsLoading,
    optionsError,
    getOptions,
  };
}
