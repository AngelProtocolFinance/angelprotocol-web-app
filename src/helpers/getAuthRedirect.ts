import { appRoutes, regRoutes } from "constants/routes";
import type { SignInRouteState } from "types/auth";

/**
 * Determines the pathname to which to redirect post-authentication
 * @param isSigningUp defaults to `true`
 */

interface AuthRedirect {
  path: string;
  search: string;
  data?: unknown;
}

/** only provide if user is signing up */
interface SignUpOpts {
  isNpo: boolean;
}

export function getAuthRedirect(
  signInRouteState: SignInRouteState | undefined,
  signupOpts?: SignUpOpts
): AuthRedirect {
  const search = signInRouteState?.search || "";
  const pathname =
    signupOpts &&
    signupOpts.isNpo &&
    signInRouteState?.from === appRoutes.register
      ? `${appRoutes.register}/${regRoutes.welcome}`
      : signInRouteState?.from || "/marketplace";
  return { path: pathname, search, data: signInRouteState?.data };
}
