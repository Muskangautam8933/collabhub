import { ROUTES } from "@/_routes.constants";
import { PUBLIC_ROUTES } from "@/app.constatns";

/**
 *
 * Navigates to the first protected route if the current location is a public route
 */
export default function navigateFromLogin(): void {
  const currentLocation = window.location.href.split("/").pop() || "/";
  if (PUBLIC_ROUTES.includes(currentLocation)) {
    window.location.href = ROUTES.PRIVATE.PROJECTS.ROOT;
  }
}
