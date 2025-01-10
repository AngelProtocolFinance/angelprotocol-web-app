import { type ActionFunction, redirect } from "@remix-run/node";
import { cognito, redirectToAuth } from "auth";
import { appRoutes } from "constants/routes";
import { isError } from "types/auth";

export const action: ActionFunction = async ({ request }) => {
  const auth = await cognito.retrieve(request);
  if (!auth || typeof auth === "string") return redirectToAuth(request);

  const res = await cognito.signOut(auth);
  if (isError(res)) return redirect(appRoutes.marketplace, { status: 500 });
  return redirect(appRoutes.marketplace, {
    headers: { "Set-Cookie": res },
  });
};
