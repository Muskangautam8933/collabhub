"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

import FieldsSidebar from "./components/field-sidebar";
import FieldInfo from "./components/field-info";

import getFilter from "@/services/get-filter";
import type { Filter } from "@/services/post-filter";

export default function FieldsSettingsPage() {

  const { projectId } = useParams();

  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);

  useEffect(() => {
    async function fetchFilters() {
      if (!projectId) return;

      const res = await getFilter(projectId as string);
      setFilters(res);
    }

    fetchFilters();
  }, [projectId]);

  function handleDelete(filterId: string) {
    setFilters((prev) => prev.filter((f) => f._id !== filterId));
    setSelectedFilter(null);
  }

  return (
    <div className="flex h-full">

      <FieldsSidebar
        filters={filters}
        setFilters={setFilters}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="flex-1 p-6">

        <FieldInfo
          selectedFilter={selectedFilter}
          onDeleteSuccess={handleDelete}
        />

      </div>

    </div>
  );
}