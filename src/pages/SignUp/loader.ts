import { loadAuth } from "auth";
import { appRoutes } from "constants/routes";
import { decodeState } from "helpers/state-params";
import { type LoaderFunction, redirect } from "react-router";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const auth = await loadAuth();
  if (auth) return redirect(appRoutes.marketplace);

  const url = new URL(request.url);
  return decodeState(url.searchParams.get("_s"));
};
