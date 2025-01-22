import { type ActionFunction, redirect } from "@vercel/remix";
import { appRoutes } from "constants/routes";
import { isError } from "types/auth";
import { cognito, toAuth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
  const { user, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request);

  const res = await cognito.signOut(session);
  if (isError(res)) return redirect(appRoutes.marketplace, { status: 500 });
  return redirect(appRoutes.marketplace, {
    headers: { "Set-Cookie": res },
  });
};
