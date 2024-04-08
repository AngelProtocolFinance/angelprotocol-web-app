import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { Navigate } from "react-router-dom";
import { StoredRouteState } from "types/auth";

export default function OAuthRedirector() {
  const retrieved: StoredRouteState | null = (() => {
    try {
      const item = localStorage.getItem(OAUTH_PATH_STORAGE_KEY);
      return item && JSON.parse(item);
    } catch (_) {
      return null;
    }
  })();
  const { pathname = "/", data } = retrieved || {};
  return <Navigate to={pathname} state={data} />;
}
