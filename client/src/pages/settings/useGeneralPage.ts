import { ROUTES } from "@/_routes.constants";
import deleteProject from "@/services/delete-project";
import type { Project } from "@/services/get-project";
import patchProject from "@/services/patch-project";
import React from "react";
import { useNavigate, useRouteLoaderData } from "react-router";
import { toast } from "react-toastify";

export function useGeneralPage() {
  const loaderData = useRouteLoaderData("project");

  const [saving, setSaving] = React.useState(false);

  const [deleting, setDeleting] = React.useState(false);

  const [project, setProject] = React.useState<Project | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const [confirmName, setConfirmName] = React.useState("");

  const navigate = useNavigate();

  /**
   * Handle saving
   * --------------
   */
  async function handleSaving(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSaving(true);

      const formData = Object.fromEntries(
        new FormData(e.currentTarget),
      ) as Partial<Project>;

      console.log(formData);

      await patchProject(project?._id, formData);

      toast.success("Project updated successfully");
      setSaving(false);
    } catch (error) {
      toast.error(error as string);
      setSaving(false);
    }
  }

  /**
   * Handle deletion
   * ----------------
   */
  async function handleDeletion(e: React.MouseEvent) {
    e.preventDefault();

    if (confirmName !== project?.name) return toast.error("Invalid name");

    try {
      setDeleting(true);

      await deleteProject(project?._id);

      toast.success("Project deleted successfully");

      setDeleting(false);

      setShowDeleteDialog(false);

      return navigate(ROUTES.PRIVATE.PROJECTS.ROOT);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch users",
      );
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  React.useEffect(() => {
    setProject(loaderData.project);
  }, [loaderData]);

  return {
    project,
    saving,
    deleting,
    showDeleteDialog,
    confirmName,
    setShowDeleteDialog,
    setConfirmName,
    handleSaving,
    handleDeletion,
  };
}
