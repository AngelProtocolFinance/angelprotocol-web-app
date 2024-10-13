import { loadAuth, userRes } from "auth/load-auth";
import { appRoutes } from "constants/routes";
import { decodeState } from "helpers/state-params";
import { type LoaderFunction, redirect } from "react-router-dom";

export { SignUp as Component } from "./SignUp";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const res = await loadAuth(request);
  if (userRes(res)) return redirect(appRoutes.marketplace);

  const url = new URL(request.url);
  const fromState = decodeState(url.searchParams.get("_s"));

  return fromState;
};
