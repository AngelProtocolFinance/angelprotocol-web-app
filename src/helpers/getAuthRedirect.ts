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
  fromState: SignInRouteState | undefined,
  signupOpts?: SignUpOpts
): AuthRedirect {
  const search = fromState?.search || "";
  const pathname =
    signupOpts && signupOpts.isNpo && fromState?.from === appRoutes.register
      ? `${appRoutes.register}/${regRoutes.welcome}`
      : fromState?.from || "/marketplace";
  return { path: pathname, search, data: fromState?.data };
}
