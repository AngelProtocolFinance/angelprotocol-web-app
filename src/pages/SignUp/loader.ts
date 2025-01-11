import { type LoaderFunction, redirect } from "@vercel/remix";
import { cognito } from "auth";
import { appRoutes } from "constants/routes";
import { decodeState } from "helpers/state-params";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const { user, headers } = await cognito.retrieve(request);
  if (user) return redirect(appRoutes.marketplace, { headers });

  const url = new URL(request.url);
  return decodeState(url.searchParams.get("_s"));
};
