import { getEndow } from "api/get/endow";
import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "react-router-dom";
import { version as v } from "services/helpers";
import type { EndowmentUpdate } from "services/types";
import type { EndowmentSettingsAttributes } from "types/aws";
export { default as Component } from "./Form";

const fields: EndowmentSettingsAttributes[] = [
  "receiptMsg",
  "hide_bg_tip",
  "progDonationsAllowed",
  "donateMethods",
];
export const loader: LoaderFunction = async ({ params }) =>
  getEndow(params.id, fields);

export const action: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const update: EndowmentUpdate = await request.json();

  const url = new URL(APIs.aws);
  url.pathname = `/${v(9)}/endowments/${params.id}`;

  const req = new Request(url, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { authorization: auth.idToken },
  });

  const res = await fetch(req);

  if (!res.ok) throw res;

  const key = new URL(APIs.aws);
  key.pathname = `v9/endowments/${params.id}`;

  await caches
    .open("bg")
    .then((cache) => cache.delete(key.toString(), { ignoreSearch: true }));

  return redirect("success");
};
