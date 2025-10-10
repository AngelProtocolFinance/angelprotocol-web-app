import { valibotResolver } from "@hookform/resolvers/valibot";
import type { ActionFunction } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import { type IEmailSubs, email_subs } from "types/hubspot-subscription";
import { cognito, to_auth } from ".server/auth";
import { userdb } from ".server/aws/db";
import { hubspot_envs } from ".server/env";
import { hubspot_forms } from ".server/sdks";

export const action: ActionFunction = async ({ request }) => {
  const r = request.clone();
  const form = await r.formData();
  const intent = form.get("intent");

  if (intent === "subscribe") {
    const fv = await getValidatedFormData<IEmailSubs>(
      form,
      valibotResolver(email_subs)
    );
    if (fv.errors) return fv;

    const res = await hubspot_forms(
      (x) => {
        x.pathname = `submissions/v3/integration/submit/${hubspot_envs.portal_id}/${hubspot_envs.subs_form_id}`;
        return x;
      },
      (h) => {
        const b = {
          fields: [{ name: "email", value: fv.data.email }],
        };
        h.append("content-type", "application/json");
        return { headers: h, method: "POST", body: JSON.stringify(b) };
      }
    );
    if (!res.ok) return "error";
    return "success";
  }

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

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
