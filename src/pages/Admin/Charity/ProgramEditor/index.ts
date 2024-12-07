import { ap, ver } from "api/api";
import { getProgram } from "api/get/program";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionFunction, LoaderFunction } from "react-router-dom";
export { ErrorElement as ErrorBoundary } from "errors/ErrorElement";

export { default as Component } from "./ProgramEditor";

export const loader: LoaderFunction = async ({ params }) =>
  getProgram(params.id, params.programId);

export const action: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await ap.patch(
    `${ver(1)}/endowments/${params.id}/programs/${params.programId}`,
    {
      headers: { authorization: auth.idToken },
      json: await request.json(),
    }
  );

  return { ok: true };
};
