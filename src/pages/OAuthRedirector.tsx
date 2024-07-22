import LoaderRing from "components/LoaderRing";
import { Navigate, useLocation } from "react-router-dom";
import type { OAuthState } from "types/auth";

export default function OAuthRedirector() {
  const location = useLocation();

  const state: OAuthState | null = location.state
    ? JSON.parse(location.state)
    : null;

  if (!state) {
    return (
      <LoaderRing
        thickness={10}
        classes={{ container: "w-32 place-self-center" }}
      />
    );
  }

  const { pathname = "/", data } = state || {};
  return <Navigate to={pathname} state={data} />;
}
