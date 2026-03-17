"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import createFilterValue from "@/services/post-filterValues";
import getFilterValues from "@/services/get-filterValues";
import type { Filter } from "@/services/post-filter";
import { useParams } from "react-router";

type Option = {
  _id: string;
  name: string;
  description?: string;
  color?: string;
};

type Props = {
  selectedFilter: Filter | null;
};
const COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
];
function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function FilterOptions({ selectedFilter }: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState("");

  const { projectId } = useParams();

  async function handleAddOption() {
    if (!selectedFilter || !value.trim()) return;
    const color = getRandomColor();

    try {
      const newOption = await createFilterValue(
        projectId as string,
        selectedFilter._id,
        {
          name: value,
          color: color,
        },
      );

      setOptions((prev) => [...prev, newOption]);
      setValue("");
    } catch (error) {
      console.error(error);
    }
  }

  // Load options when filter changes
  useEffect(() => {
    if (!selectedFilter) return;

    const filterId = selectedFilter._id;

    async function loadOptions() {
      try {
        const res = await getFilterValues(projectId as string, filterId);

        setOptions(res);
        setValue("");
      } catch (error) {
        console.error(error);
      }
    }

    loadOptions();
  }, [selectedFilter, projectId]);

  if (!selectedFilter) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a filter to manage options
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {/* Options list */}
      {options.map((option) => (
        <div
          key={option._id}
          className="flex items-center gap-2 border rounded-md px-3 py-2"
        >
          <span
            className="px-2 py-1 text-xs rounded-full text-white"
            style={{ backgroundColor: option.color }}
          >
            {option.name}
          </span>
        </div>
      ))}

      {/* Add option */}
      <div className="flex gap-2">
        <Input
          placeholder="Add option..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button onClick={handleAddOption} className="bg-green-600">Add</Button>
      </div>
    </div>
  );
}
