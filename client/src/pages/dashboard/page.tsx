import { usePageContext } from "./_context";

export default function Page() {
  const ctx = usePageContext();

  if (!ctx.projectId) {
    return <div>Project not found</div>;
  }

  return <div className="size-full">Dash boar</div>;
}
