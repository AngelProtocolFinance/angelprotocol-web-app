import LoaderRing from "components/LoaderRing";
<<<<<<< HEAD

export default function OAuthRedirector() {
  /**
   * 1. oauth provider redirects back here, effectively reloading the the whole app.
   * 2. Amplify is reconfigured
   * 3. Hub oauth state is reinitialized
   * 4. custom state event fires with router.navigate()
   *
   */
  return (
    <LoaderRing
      thickness={10}
      classes={{ container: "w-32 place-self-center" }}
    />
  );
=======
import { Navigate, useLocation } from "react-router-dom";
import type { OAuthState } from "types/auth";

export default function OAuthRedirector() {
  const location = useLocation();

  const state: OAuthState | null = location.state
    ? JSON.parse(location.state)
    : null;

  /** when provider (`A.`) redirects back to our app thru `/oauth-redirector` it doesn't pass `state`
   * `A.` - Amplify is configured in src/index.tsx
   *  App.tsx listens to `auth.customOAuthState` event and navigates to `/oauth-redirector`, this time with `state`
   */
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
>>>>>>> ab7d97e0d (Auth redirect (#3165))
}
