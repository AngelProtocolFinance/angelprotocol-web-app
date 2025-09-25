import { appRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router";
import { isError } from "types/auth";
import { cognito, to_auth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
  const { user, session } = await cognito.retrieve(request);
  if (!user) return to_auth(request);

  const res = await cognito.signOut(session);
  if (isError(res)) return redirect(appRoutes.marketplace, { status: 500 });
  return redirect(appRoutes.marketplace, {
    headers: { "set-cookie": res },
  });
};
