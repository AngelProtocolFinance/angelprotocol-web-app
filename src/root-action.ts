import type { ActionFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { parseWithValibot } from "conform-to-valibot";
import { emailSubs } from "types/hubspot-subscription";
import { cognito, toAuth } from ".server/auth";
import { createBookmark, deleteBookmark } from ".server/user-bookmarks";

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

    if (action === "add") {
      await createBookmark(user.email, Number.parseInt(endowId as string, 10));
      return action;
    }

    if (action === "delete") {
      await deleteBookmark(user.email, Number.parseInt(endowId as string, 10));
      return action;
    }
  }

  return new Response("Invalid intent", { status: 400 });
};
