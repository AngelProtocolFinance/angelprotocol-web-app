import { Navigate } from "react-router-dom";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";

export default function OAUTHRedirector() {
  return <Navigate to={localStorage.getItem(OAUTH_PATH_STORAGE_KEY) ?? "/"} />;
}
