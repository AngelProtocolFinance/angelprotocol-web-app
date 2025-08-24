import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { parseWithValibot } from "conform-to-valibot";
import type { UserV2 } from "types/auth";
import type { EndowAdmin } from "types/npo";
import { schema } from "./schema";
import { npodb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  user: UserV2;
  admins: EndowAdmin[];
}

export const members: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const admins = await ap
    .get<EndowAdmin[]>(`${ver(2)}/endowments/${adm.id}/admins`, {
      headers: { authorization: adm.idToken },
    })
    .json();
  return { admins, user: adm } satisfies LoaderData;
};

export const deleteAction: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const { toRemove } = await adm.req.json();

  await ap.delete(`${ver(2)}/endowments/${adm.id}/admins/${toRemove}`, {
    headers: { authorization: adm.idToken },
  });
  return { ok: true };
};

export const addAction: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await adm.req.formData();
  const payload = parseWithValibot(fv, { schema: schema([]) });
  if (payload.status !== "success") return payload.reply();

  const endow = await npodb.npo(adm.id, ["name"]);
  if (!endow) return { status: 404 };

  await ap.post(`${ver(2)}/endowments/${adm.id}/admins`, {
    headers: { authorization: adm.idToken },
    json: { ...payload.value, endowName: endow.name },
  });
  // members list
  return redirect("..");
};
