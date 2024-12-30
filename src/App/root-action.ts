import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { cognito } from "auth/cognito";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router";
import { emailSubs } from "types/hubspot-subscription";

export const rootAction: ActionFunction = async ({ request }) => {
  const r = request.clone();
  const form = await r.formData();
  const intent = form.get("intent");

  if (intent === "subscribe") {
    const payload = await request
      .formData()
      .then((f) => parseWithValibot(f, { schema: emailSubs }));

    if (payload.status !== "success") return payload.reply();

    const res = await ap.post(`${ver(1)}/hubspot/email-subs`, {
      throwHttpErrors: false,
      json: { email: payload.value.email },
    });
    if (!res.ok) return "error";
    return "success";
  }

  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  //authenticated requests

  if (intent === "logout") {
    await cognito.signOut(auth.accessToken);
    return redirect(appRoutes.marketplace);
  }

  if (intent === "toggle-bookmark") {
    const data = await request.formData();
    const action = data.get("action");
    const endowId = data.get("endowId");

    return action === "add"
      ? ap.post(`${ver(1)}/bookmarks`, {
          headers: { authorization: auth.idToken },
          json: { endowId },
        })
      : ap.delete(`${ver(1)}/bookmarks/${endowId}`, {
          headers: { authorization: auth.idToken },
        });
  }

  return { status: 400, body: "invalid intent" };
};
