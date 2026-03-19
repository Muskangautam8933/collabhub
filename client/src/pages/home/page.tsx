import Header from "./components/header";
import SearchWorkspace from "./components/search";
import Projects from "./components/projects";

export default function Page() {
  return (
    <div className="size-full">
      <Header />
      <SearchWorkspace />
      <Projects />
    </div>
  );
}
