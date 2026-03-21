import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from "react-router";
import { postTask, type Task } from "@/services/post-task";
import { toast } from "react-toastify";

export type TaskFormProps = React.HTMLAttributes<HTMLDivElement> & {
  filterValueId: string;
};

export default function TaskForm({ children, filterValueId }: TaskFormProps) {
  const [showForm, setShowForm] = useState(false);
  const { projectId } = useParams();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const payload = Object.fromEntries(new FormData(e.currentTarget));

      await postTask(projectId, {
        ...payload,
        filterValue: filterValueId,
      } as Task);

      setShowForm(false);
      toast.success("Task created successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create task",
      );
    }
  }

  return (
    <Dialog onOpenChange={setShowForm} open={showForm}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Input placeholder="Task title" name="title" />
            {/* <span className="text-sm opacity-45">{`${taskInput.title.length}/${LIMIT.TASK_TITLE}`}</span> */}

            <Textarea placeholder="Task description" name="description" />
            {/* <span className="text-sm opacity-45">{`${taskInput.description.length}/${500}`}</span> */}
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
