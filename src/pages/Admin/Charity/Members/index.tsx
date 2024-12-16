import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { loadAuth } from "auth/load-auth";
import { parseWithValibot } from "conform-to-valibot";
import { adminRoutes } from "constants/routes";
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
  redirect,
} from "react-router-dom";
import { AddForm } from "./AddForm";
import Members from "./Members";
import { schema } from "./schema";

export const loader: LoaderFunction = async ({ params }) => {
  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated`;

  return ap.get(`${ver(2)}/endowments/${params.id}/admins`, {
    headers: { authorization: auth.idToken },
  });
};

const addAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated`;

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

const deleteAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated`;

  const { toRemove } = await request.json();

  await ap.delete(`${ver(2)}/endowments/${params.id}/admins/${toRemove}`, {
    headers: { authorization: auth.idToken },
  });
  return { ok: true };
};

export const membersRoute: RouteObject = {
  id: "endow-admins",
  path: adminRoutes.members,
  loader,
  action: deleteAction,
  element: <Members />,
  children: [{ path: "add", element: <AddForm />, action: addAction }],
};
