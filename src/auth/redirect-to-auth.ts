import { appRoutes } from "constants/routes";
import { decodeState, toUrlWithState } from "helpers/state-params";
import { redirect } from "react-router-dom";
import type { SignInRouteState } from "types/auth";

export const redirectToAuth = (req: Request) => {
  const from = new URL(req.url);

  const toState: SignInRouteState = {
    from: from.pathname,
    data: decodeState(from.searchParams.get("_s")),
    search: from.search,
  };

  const to = new URL(req.url);
  to.pathname = appRoutes.signup;

  return redirect(toUrlWithState(to, toState).toString());
};
