import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { parseWithValibot } from "conform-to-valibot";
import type { UserV2 } from "types/auth";
import type { EndowAdmin } from "types/npo";
import { admin_checks, is_resp } from "../utils";
import { schema } from "./schema";

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

  const endow = await getEndow(adm.id, ["name"]);

  await ap.post(`${ver(2)}/endowments/${adm.id}/admins`, {
    headers: { authorization: adm.idToken },
    json: { ...payload.value, endowName: endow.name },
  });
  // members list
  return redirect("..");
};
