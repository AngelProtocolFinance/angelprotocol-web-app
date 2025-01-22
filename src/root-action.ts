import type { ActionFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { parseWithValibot } from "conform-to-valibot";
import { emailSubs } from "types/hubspot-subscription";
import { cognito, toAuth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
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

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  //authenticated requests

  if (intent === "toggle-bookmark") {
    const data = await request.formData();
    const action = data.get("action");
    const endowId = data.get("endowId");

    return action === "add"
      ? ap.post(`${ver(1)}/bookmarks`, {
          headers: { authorization: user.idToken },
          json: { endowId },
        })
      : ap.delete(`${ver(1)}/bookmarks/${endowId}`, {
          headers: { authorization: user.idToken },
        });
  }

  return { status: 400, body: "invalid intent" };
};
