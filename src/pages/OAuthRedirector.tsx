import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { Navigate } from "react-router-dom";

export default function OAuthRedirector() {
  return <Navigate to={localStorage.getItem(OAUTH_PATH_STORAGE_KEY) ?? "/"} />;
}
