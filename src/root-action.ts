import { valibotResolver } from "@hookform/resolvers/valibot";
import { ap, ver } from "api/api";
import type { ActionFunction } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import { type IEmailSubs, email_subs } from "types/hubspot-subscription";
import { cognito, toAuth } from ".server/auth";
import { userdb } from ".server/aws/db";

export const action: ActionFunction = async ({ request }) => {
  const r = request.clone();
  const form = await r.formData();
  const intent = form.get("intent");

  if (intent === '"subscribe"') {
    const fv = await getValidatedFormData<IEmailSubs>(
      form,
      valibotResolver(email_subs)
    );
    if (fv.errors) return fv;
    const res = await ap.post(`${ver(1)}/hubspot/email-subs`, {
      throwHttpErrors: false,
      json: { email: fv.data.email },
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
      await userdb.user_bookmark_put(
        user.email,
        Number.parseInt(endowId as string, 10)
      );
      return action;
    }

    if (action === "delete") {
      await userdb.user_bookmark_del(
        user.email,
        Number.parseInt(endowId as string, 10)
      );
      return action;
    }
  }

  return new Response("Invalid intent", { status: 400 });
};
