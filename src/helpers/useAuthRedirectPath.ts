import { appRoutes, regRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import { SignInRouteState } from "types/routeStates";

/**
 * Determines the pathname to which to redirect post-authentication
 * @param isSigningUp defaults to `true`
 */
export function useAuthRedirectPath(isSigningUp = true): {
  pathname: string;
  search: string;
} {
  const { state } = useLocation();
  const signInRouteState: SignInRouteState | undefined = state;

  const search = signInRouteState?.search || "";
  const pathname =
    isSigningUp && signInRouteState?.from === appRoutes.register
      ? `${appRoutes.register}/${regRoutes.welcome}`
      : signInRouteState?.from || "/";
  return { pathname, search };
}
