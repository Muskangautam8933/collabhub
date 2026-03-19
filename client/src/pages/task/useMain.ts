import type { LoaderData } from "@/loaders/projects.loader";
import { useRouteLoaderData } from "react-router";

export default function useMain() {
  const loaderData = useRouteLoaderData("projects") as LoaderData;
  return {
    loaderData,
  };
}
