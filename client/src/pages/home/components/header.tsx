import { APP_NAME } from "@/app.constatns";
import { Button } from "@/components/ui/button";
import { Command, LogOut } from "lucide-react";
import { Link } from "react-router";
import logout from "@/services/logout";

// -------------------- HEADER ---------------------
export default function Header() {
  return (
    <header className="px-[15vw] py-2 flex justify-between">
      <Link to={"/"} className="text-2xl font-semibold">
        <Button>
          <Command className="size-4" />
          {APP_NAME}
        </Button>
      </Link>
      <Button onClick={logout}>
        <LogOut className="size-4" />
        Logout
      </Button>
    </header>
  );
}
