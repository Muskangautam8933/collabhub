import { useLocation } from "react-router";
import { Card } from "./ui/card";

export const RightSidebar = () => {
  const location = useLocation();
  const IncludePaths = ["/me/communications"];

  if (!IncludePaths.includes(location.pathname)) {
    return null;
  }
  return (
    <div>
      <Card className="w-[18rem] h-full rounded-none bg-transparent border-none shadow-none"></Card>
    </div>
  );
};
