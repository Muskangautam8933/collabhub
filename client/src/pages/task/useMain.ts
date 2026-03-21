import getFilter, { type Filter } from "@/services/get-filter";
import getFilterValues, { type FilterValue } from "@/services/get-filterValues";
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

  const [filterValues, setFilterValues] = React.useState<FilterValue[]>([]);
  const [filterValuesLoading, setFilterValuesLoading] =
    React.useState<boolean>(false);
  const [filterValuesError, setFilterValuesError] = React.useState<
    string | null
  >(null);

  const [columnBy, setColumnBy] = React.useState<string>(
    searchParams.get("columnBy") || "",
  );

  /**
   * Get filters
   */
  React.useEffect(() => {
    (async () => {
      if (projectId) {
        try {
          setFiltersLoading(true);
          const res = await getFilter(projectId as string);

          console.log(res);

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
        const filterName = searchParams.get("columnBy");

        const filterId =
          filters.find((f) => f.name === filterName)?._id || filters[0]?._id;

        if (!filterId) return;

        try {
          setFilterValuesLoading(true);
          const res = await getFilterValues(
            projectId as string,
            filterId as string,
          );

          console.log(res);

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
  }, [filters, projectId, searchParams]);

  React.useEffect(() => {
    setColumnBy(searchParams.get("columnBy") || filters[0]?.name || "");
  }, [filters, searchParams]);

  const getColumnBySelectionHandler = (value: string) => () => {
    setSearchParams({ columnBy: value });
    setColumnBy(value);
  };

  return {
    filters,
    filtersLoading,
    filtersError,
    filterValues,
    filterValuesLoading,
    filterValuesError,
    columnBy,
    getColumnBySelectionHandler,
  };
}
