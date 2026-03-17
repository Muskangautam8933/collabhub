"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useParams } from "react-router";

import createFilter from "@/services/post-filter";
import updateFilter from "@/services/update-filter";

import type { Filter } from "@/services/post-filter";

type Props = {
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  selectedFilter: Filter | null;
  setSelectedFilter: Dispatch<SetStateAction<Filter | null>>;
};

export default function FieldsSidebar({
  filters,
  setFilters,
  selectedFilter,
  setSelectedFilter,
}: Props) {

  const { projectId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  async function handleCreate() {
    if (!projectId) return;

    const newFilter = await createFilter(projectId as string, {
      name,
      description,
    });

    setFilters((prev) => [...prev, newFilter]);

    setName("");
    setDescription("");

    setCreateOpen(false);
  }

  async function handleUpdate() {
    if (!projectId || !selectedFilter) return;

    const updated = await updateFilter(
      projectId as string,
      selectedFilter._id,
      {
        name,
        description,
      }
    );

    setFilters((prev) =>
      prev.map((f) => (f._id === updated._id ? updated : f))
    );

    setSelectedFilter(updated);

    setEditOpen(false);
  }

  return (
    <div className="w-64 border-r bg-muted/20">

      <ScrollArea className="h-full p-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">

          <h3 className="text-sm font-semibold">Custom filters</h3>

          <Dialog open={createOpen} onOpenChange={setCreateOpen}>

            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <Plus size={16} />
              </Button>
            </DialogTrigger>

            <DialogContent>

              <DialogHeader>
                <DialogTitle>Create Filter</DialogTitle>
              </DialogHeader>

              <Input
                placeholder="Filter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <DialogFooter>
                <Button onClick={handleCreate}>Create</Button>
              </DialogFooter>

            </DialogContent>

          </Dialog>

        </div>

        {/* FILTER LIST */}
        <div className="space-y-1">

          {filters.map((filter) => (

            <div
              key={filter._id}
              onClick={() => {
                setSelectedFilter(filter);

                setName(filter.name);
                setDescription(filter.description || "");

                setEditOpen(true);
              }}
              className={`px-3 py-2 text-sm rounded-md cursor-pointer
                ${
                  selectedFilter?._id === filter._id
                    ? "bg-muted"
                    : "hover:bg-muted"
                }`}
            >
              {filter.name}
            </div>

          ))}

        </div>

        {/* EDIT MODAL */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>

          <DialogContent>

            <DialogHeader>
              <DialogTitle>Edit Filter</DialogTitle>
            </DialogHeader>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <DialogFooter>
              <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-600">
                Update
              </Button>
            </DialogFooter>

          </DialogContent>

        </Dialog>

      </ScrollArea>

    </div>
  );
}