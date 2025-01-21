import type { EndowAdmin } from "@better-giving/user";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { cognito, redirectToAuth } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";

export interface LoaderData {
  admins: EndowAdmin[];
}

export const members: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const admins = await ap
    .get(`${ver(2)}/endowments/${params.id}/admins`, {
      headers: { authorization: user.idToken },
    })
    .json();
  return { admins };
};

export const deleteAction: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const { toRemove } = await request.json();

  await ap.delete(`${ver(2)}/endowments/${params.id}/admins/${toRemove}`, {
    headers: { authorization: user.idToken },
  });
  return { ok: true };
};

export const addAction: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: schema([]) });
  if (payload.status !== "success") return payload.reply();

  const endow = await getEndow(params.id, ["name"]);

  await ap.post(`${ver(2)}/endowments/${params.id}/admins`, {
    headers: { authorization: user.idToken },
    json: { ...payload.value, endowName: endow.name },
  });
  // members list
  return redirect("..");
};
