import Header from "./components/header";
import SearchProject from "./components/search";
import WelcomMessage from "./components/welcome-message";
import Projects from "./components/projects";

export default function Page() {
  
  return (
    <div className="size-full">
      <Header />
      <WelcomMessage />
      <SearchProject />
      <Projects  />
    </div>
  );
}
