import { cognito } from "auth/cognito";
import { appRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router-dom";

export const rootAction: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "logout") {
    const token = form.get("token");
    if (!token) return { status: 400, body: "missing token" };
    await cognito.signOut(token.toString());
    return redirect(appRoutes.marketplace);
  }

  return { status: 400, body: "invalid intent" };
};
