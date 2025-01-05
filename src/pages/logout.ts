import { type ActionFunction, redirect } from "@remix-run/node";
import { cognito, redirectToAuth } from "auth";
import { appRoutes } from "constants/routes";
import { redirectWithError } from "remix-toast";
import { isError } from "types/auth";

export const action: ActionFunction = async ({ request }) => {
  const auth = await cognito.retrieve(request);
  if (!auth || typeof auth === "string") return redirectToAuth(request);

  const res = await cognito.signOut(auth);
  if (isError(res))
    return redirectWithError(appRoutes.marketplace, "Failed to logout");
  return redirect(appRoutes.marketplace, {
    headers: { "Set-Cookie": res },
  });
};
