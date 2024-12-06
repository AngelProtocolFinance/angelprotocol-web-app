import { getEndow } from "api/get/endow";
import { loadAuth } from "auth/load-auth";
import { parseWithValibot } from "conform-to-valibot";
import { adminRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
  redirect,
} from "react-router-dom";
import { version } from "services/helpers";
import { AddForm } from "./AddForm";
import Members from "./Members";
import { schema } from "./schema";

export const loader: LoaderFunction = async ({ params }) => {
  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated`;

  const url = new URL(APIs.aws);
  url.pathname = `${version(2)}/endowments/${params.id}/admins`;
  const req = new Request(url);
  req.headers.set("authorization", auth.idToken);

  return fetch(req);
};

const addAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated`;

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: schema([]) });
  if (payload.status !== "success") return payload.reply();

  const endow = await getEndow(params.id, ["name"]);

  const resource = new URL(APIs.aws);
  resource.pathname = `${version(2)}/endowments/${params.id}/admins`;

  const req = new Request(resource, {
    method: "POST",
    headers: {
      authorization: auth.idToken,
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...payload.value, endowName: endow.name }),
  });

  const res = await fetch(req);
  if (!res.ok) throw res;
  // members list
  return redirect("..");
};

export const membersRoute: RouteObject = {
  id: "endow-admins",
  path: adminRoutes.members,
  loader,
  element: <Members />,
  children: [{ path: "add", element: <AddForm />, action: addAction }],
};
