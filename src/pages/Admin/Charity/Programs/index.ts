import { getPrograms } from "api/get/programs";
import { loadAuth, redirectToAuth } from "auth";
import { adminRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { type LoaderFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";

export { default as Component } from "./Programs";

export const loader: LoaderFunction = async ({ params }) =>
  getPrograms(params.id);

export const action: LoaderFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  if (request.method === "DELETE") {
    const url = new URL(APIs.aws);
    const progId = await request.formData().then((f) => f.get("programId"));
    url.pathname = `${v(2)}/endowments/${params.id}/programs/${progId}`;
    const req = new Request(url, {
      method: "DELETE",
      headers: { authorization: auth.idToken },
    });
    const res = await fetch(req);
    if (!res.ok) throw res;

    const key = new URL(APIs.aws);
    key.pathname = `${v(1)}/endowments/${params.id}/programs`;
    await caches.open("cache").then((cache) => cache.delete(key));

    return res;
  }

  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/endowments/${params.id}/programs`;

  const req = new Request(url, {
    method: "POST",
    headers: { authorization: auth.idToken },
    body: await request.json().then((res) => JSON.stringify(res)),
  });
  const res = await fetch(req);
  if (!res.ok) throw res;

  const key = new URL(APIs.aws);
  key.pathname = `${v(1)}/endowments/${params.id}/programs`;
  await caches.open("cache").then((cache) => cache.delete(key));

  const id = await res.json().then((data) => data.id);
  return redirect(`../${adminRoutes.program_editor}/${id}`);
};
