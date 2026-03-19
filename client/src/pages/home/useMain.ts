import type { LoaderData } from "@/loaders/projects.loader";
import type { Project } from "@/services/get-project";
import { postProject, type Payload } from "@/services/post-project";
import React, { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { toast } from "react-toastify";

export default function useMain() {
  const loaderData = useRouteLoaderData("projects") as LoaderData;
  const [isOpenModel, setIsOpenModel] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const project = await postProject(formData as Payload);

      toast.success("Project created successfully");

      setIsOpenModel(false);

      setProjects((prev) => [project, ...prev]);
    } catch (error) {
      toast.error(error as string);
    }
  }

  React.useEffect(() => {
    setProjects(loaderData.projectsRes.owned);
  }, [loaderData]);

  return {
    loaderData,
    handleFormSubmit,
    projects,
    setProjects,
    isOpenModel,
    setIsOpenModel,
  };
}
