import { Link } from "react-router";
import style from "./style";
import { useAuthContext } from "@/contexts/auth.contex";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/app.constatns";
import { ROUTES } from "@/_routes.constants";

export default function Page() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className={style.page}>
      <div>
        {isAuthenticated ? (
          <Link to={`${ROUTES.PRIVATE.PROJECTS.ROOT}`}>
            <Button className="cursor-pointer">Open {APP_NAME}</Button>
          </Link>
        ) : (
          <Link to={`${ROUTES.PUBLIC.LOGIN}`}>
            <Button className="cursor-pointer">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
