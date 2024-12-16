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

  const basePath = `${ver(1)}/endowments/${params.id}/programs/${params.programId}`;

  const { intent, ...p } = await request.json();

  if (intent === "add-milestone") {
    const res = await ap.post(`${basePath}/milestones`, {
      headers: { authorization: auth.idToken },
      json: {
        title: `Milestone ${p["next-milestone-num"]}`,
        description: "milestone description",
        date: new Date().toISOString(),
      },
    });
    return { ok: res.ok };
  }

  if (intent === "delete-milestone") {
    const res = await ap.delete(`${basePath}/milestones/${p["milestone-id"]}`, {
      headers: { authorization: auth.idToken },
    });
    return { ok: res.ok };
  }

  if (intent === "edit-milestone") {
    const { "milestone-id": id, ...rest } = p;
    const res = await ap.patch(`${basePath}/milestones/${id}`, {
      json: rest,
      headers: { authorization: auth.idToken },
    });
    return { ok: res.ok };
  }

  //edit program
  const res = await ap.patch(basePath, {
    headers: { authorization: auth.idToken },
    json: p,
  });

  return { ok: res.ok };
};
