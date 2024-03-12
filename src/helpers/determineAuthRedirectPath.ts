import { appRoutes, regRoutes } from "constants/routes";
import { SignInRouteState } from "types/routeStates";

/**
 * Determines the pathname to which to redirect post-authentication
 * @param isSigningUp defaults to `true`
 */
export function determineAuthRedirectPath(
  signInRouteState: SignInRouteState | undefined,
  { isSigningUp } = { isSigningUp: true }
): {
  pathname: string;
  search: string;
} {
  const search = signInRouteState?.search || "";
  const pathname =
    isSigningUp && signInRouteState?.from === appRoutes.register
      ? `${appRoutes.register}/${regRoutes.welcome}`
      : signInRouteState?.from || "/";
  return { pathname, search };
}
