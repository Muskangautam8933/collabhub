import { ROUTES } from "@/_routes.constants";
import { PROTECTED_ROUTES } from "@/app.constatns";

export default function navigateFromProtectedToLogin(): void {
  const currentLocation = window.location.pathname.split("/")[1];
  if (PROTECTED_ROUTES.includes(currentLocation)) {
    window.location.href = ROUTES.PUBLIC.LOGIN;
  }
}
