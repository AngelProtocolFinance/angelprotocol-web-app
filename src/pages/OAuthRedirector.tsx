import { Navigate } from "react-router-dom";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";

export default function OAUTHRedirector() {
  //oauth custom state is not in redirect URL params so use local storage record instead
  return <Navigate to={localStorage.getItem(OAUTH_PATH_STORAGE_KEY) || "/"} />;
}
