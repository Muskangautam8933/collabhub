import getFilter, { type Filter } from "@/services/get-filter";
import getFilterValues, { type FilterValue } from "@/services/get-filterValues";
import getTasks, { type Response } from "@/services/get-tasks";
import React from "react";
import { useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export default function useMain() {
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  /*******************************************************************
   ******************************* STATES ****************************
   *******************************************************************/

  const [filters, setFilters] = React.useState<Filter[]>([]);
  const [filtersLoading, setFiltersLoading] = React.useState<boolean>(false);
  const [filtersError, setFiltersError] = React.useState<string | null>(null);

  const [tasks, setTasks] = React.useState<Response[]>([]);
  const [tasksLoading, setTasksLoading] = React.useState<boolean>(false);
  const [tasksError, setTasksError] = React.useState<string | null>(null);

  const [filterValues, setFilterValues] = React.useState<FilterValue[]>([]);
  const [filterValuesLoading, setFilterValuesLoading] =
    React.useState<boolean>(false);
  const [filterValuesError, setFilterValuesError] = React.useState<
    string | null
  >(null);

  const [columnBy, setColumnBy] = React.useState<string>("");

  const filterId = React.useMemo(() => {
    return filters.find((f) => f.name === columnBy)?._id || filters[0]?._id;
  }, [columnBy, filters]);

  /**
   * Get tasks
   */
  React.useEffect(() => {
    (async () => {
      if (projectId) {
        try {
          setTasksLoading(true);

          const res = await getTasks(projectId as string);

          setTasks(res);

          setTasksLoading(false);
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to fetch",
          );
          setTasksError(error as string);
          setTasksLoading(false);
        }
      }
    })();
  }, [filters, projectId, searchParams, filterId]);

  /**
   * Get filters
   */
  React.useEffect(() => {
    (async () => {
      if (projectId) {
        try {
          setFiltersLoading(true);
          const res = await getFilter(projectId as string);

          setFilters(res);
          setFiltersLoading(false);
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to fetch",
          );
          setFiltersError(error as string);
          setFiltersLoading(false);
        }
      }
    })();
  }, [projectId]);

  /**
   * Get filter values
   */
  React.useEffect(() => {
    (async () => {
      if (projectId) {
        if (!filterId) return;

        try {
          setFilterValuesLoading(true);
          const res = await getFilterValues(
            projectId as string,
            filterId as string,
          );

          setFilterValues(res);

          setFilterValuesLoading(false);
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to fetch",
          );
          setFilterValuesError(error as string);
          setFilterValuesLoading(false);
        }
      }
    })();
  }, [filters, projectId, searchParams, filterId]);

  /**
   * Set columnBy
   */
  React.useEffect(() => {
    setColumnBy(searchParams.get("columnBy") || filters[0]?.name || "");
  }, [filters, searchParams]);

  const getColumnBySelectionHandler = (value: string) => () => {
    setSearchParams({ columnBy: value });
    setColumnBy(value);
  };

  const getDropHandler =
    (targetFilterValue: string) => (e: React.DragEvent<HTMLDivElement>) => {
      const taskId = e.dataTransfer.getData("text/plain");
      const targetFilterId = filterId;
      const task = tasks.find((T) => T._id === taskId);

      if (!task) return;

      if (task.filters.find((f) => f.filterId === targetFilterId)) {
        console.log("Task already has this filter");
        setTasks((p) => [
          ...p.map((t) => {
            if (t._id === taskId) {
              return {
                ...t,
                filters: t.filters.map((f) => {
                  if (f.filterId === targetFilterId) {
                    return {
                      ...f,
                      valueId: targetFilterValue,
                      valueName:
                        filterValues.find((fv) => fv._id === targetFilterValue)
                          ?.name || "Unknown",
                      color:
                        filterValues.find((fv) => fv._id === targetFilterValue)
                          ?.color || "#000000",
                    };
                  }
                  return f;
                }),
              };
            }
            return t;
          }),
        ]);
      } else {
        console.log("Task doesn't have this filter");
        setTasks((p) => [
          ...p.map((t) => {
            if (t._id === taskId) {
              return {
                ...t,
                filters: t.filters.concat({
                  valueId: targetFilterValue,
                  filterId: targetFilterId,
                  valueName:
                    filterValues.find((fv) => fv._id === targetFilterValue)
                      ?.name || "Unknown",
                  color:
                    filterValues.find((fv) => fv._id === targetFilterValue)
                      ?.color || "#000000",
                }),
              };
            }
            return t;
          }),
        ]);
      }
    };

  return {
    filters,
    filtersLoading,
    filtersError,
    filterValues,
    filterValuesLoading,
    filterValuesError,
    columnBy,
    tasks,
    tasksLoading,
    tasksError,
    filterId,
    getColumnBySelectionHandler,
    setTasks,
    getDropHandler,
  };
}
