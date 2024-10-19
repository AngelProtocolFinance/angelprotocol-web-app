import { getProgram } from "api/get/program";
import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import type { ActionFunction, LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
export { ErrorElement as ErrorBoundary } from "errors/ErrorElement";

export { default as Component } from "./ProgramEditor";

export const loader: LoaderFunction = async ({ params }) =>
  getProgram(params.id, params.programId);

export const action: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/endowments/${params.id}/programs/${params.programId}`;

  const req = new Request(url, {
    method: "PATCH",
    body: await request.json().then((res) => JSON.stringify(res)),
    headers: { authorization: auth.idToken },
  });

  await caches.open("bg").then((cache) => cache.delete(url));

  const res = await fetch(req);
  if (!res.ok) throw res;

  return res;
};
