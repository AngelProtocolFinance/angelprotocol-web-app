import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { loadAuth, redirectToAuth } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "react-router";
import { schema } from "./schema";

export const members: LoaderFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  return ap.get(`${ver(2)}/endowments/${params.id}/admins`, {
    headers: { authorization: auth.idToken },
  });
};

export const deleteAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const { toRemove } = await request.json();

  await ap.delete(`${ver(2)}/endowments/${params.id}/admins/${toRemove}`, {
    headers: { authorization: auth.idToken },
  });
  return { ok: true };
};

export const addAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: schema([]) });
  if (payload.status !== "success") return payload.reply();

  const endow = await getEndow(params.id, ["name"]);

  await ap.post(`${ver(2)}/endowments/${params.id}/admins`, {
    headers: { authorization: auth.idToken },
    json: { ...payload.value, endowName: endow.name },
  });
  // members list
  return redirect("..");
};
