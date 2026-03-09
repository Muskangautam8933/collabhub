import { useLoaderData, useParams } from "react-router";

export default function useMain() {
  const { projectId } = useParams();

  const data = useLoaderData();

  console.log("ctx", data);

  console.log(projectId);

  return {
    projectId,
  };
}
