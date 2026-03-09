import navigateFromLoginToProtected from "@/services/navigate-fromLogin";
import navigateFromProtectedToLogin from "@/services/navigate-toLogin";
import validateToken from "@/services/validate-token";
import localSpace from "@/services/local-space";

export default function checkAuth(
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const token = localSpace.getAccessToken();
  const expiresAt = localSpace.getExpiresAt();
  const isValid = validateToken({ token, expiresAt });

  if (isValid) {
    setIsAuthenticated(true);
    navigateFromLoginToProtected();
  } else {
    setIsAuthenticated(false);
    navigateFromProtectedToLogin();
  }
}
