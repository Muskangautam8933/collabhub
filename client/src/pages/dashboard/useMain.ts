import { useParams } from "react-router";

export default function useMain() {
  const { projectId } = useParams();

  console.log(projectId)

  return {
    projectId,
  };
}
