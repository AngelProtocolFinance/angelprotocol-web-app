import { appRoutes, regRoutes } from "constants/routes";
import { SignInRouteState } from "types/auth";

/**
 * Determines the pathname to which to redirect post-authentication
 * @param isSigningUp defaults to `true`
 */

type Return = {
  redirectPath: {
    pathname: string;
    search: string;
  };
  data?: unknown;
};

export function determineAuthRedirectPath(
  signInRouteState: SignInRouteState | undefined,
  { isSigningUp } = { isSigningUp: true }
): Return {
  const search = signInRouteState?.search || "";
  const pathname =
    isSigningUp && signInRouteState?.from === appRoutes.register
      ? `${appRoutes.register}/${regRoutes.welcome}`
      : signInRouteState?.from || "/marketplace";
  return { redirectPath: { pathname, search }, data: signInRouteState?.data };
}
