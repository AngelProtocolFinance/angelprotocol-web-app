import { type LoaderFunction, redirect } from "@remix-run/react";
import { loadAuth } from "auth";
import { appRoutes } from "constants/routes";
import { decodeState } from "helpers/state-params";

export const clientLoader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const auth = await loadAuth();
  if (auth) return redirect(appRoutes.marketplace);

  const url = new URL(request.url);
  return decodeState(url.searchParams.get("_s"));
};
