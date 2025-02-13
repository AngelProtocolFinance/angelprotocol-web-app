import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { parseWithValibot } from "conform-to-valibot";
import type { UserV2 } from "types/auth";
import type { EndowAdmin } from "types/aws/ap";
import { schema } from "./schema";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData {
  user: UserV2;
  admins: EndowAdmin[];
}

export const members: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const admins = await ap
    .get<EndowAdmin[]>(`${ver(2)}/endowments/${params.id}/admins`, {
      headers: { authorization: user.idToken },
    })
    .json();
  return { admins, user } satisfies LoaderData;
};

export const deleteAction: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const { toRemove } = await request.json();

  await ap.delete(`${ver(2)}/endowments/${params.id}/admins/${toRemove}`, {
    headers: { authorization: user.idToken },
  });
  return { ok: true };
};

export const addAction: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

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
