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
  const data = fromState?.data;

  if (fromState?.from === appRoutes.register) {
    return { path: `${appRoutes.register}/${regRoutes.welcome}`, search, data };
  }

  if (signupOpts?.isNpo) {
    return { path: appRoutes.register, search, data };
  }

  return {
    path: fromState?.from || "/marketplace",
    search,
    data: fromState?.data,
  };
}
