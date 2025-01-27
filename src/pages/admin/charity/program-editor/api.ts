import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getProgram } from "api/get/program";
import { cognito, toAuth } from ".server/auth";

import type { ActionData } from "types/action";

export const loader: LoaderFunction = async ({ params }) =>
  getProgram(params.id, params.programId);
export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const basePath = `${ver(1)}/endowments/${params.id}/programs/${params.programId}`;

  const { intent, ...p } = await request.json();

  if (intent === "add-milestone") {
    const res = await ap.post(`${basePath}/milestones`, {
      headers: { authorization: user.idToken },
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
      headers: { authorization: user.idToken },
    });
    return { ok: res.ok };
  }

  if (intent === "edit-milestone") {
    const { "milestone-id": id, ...rest } = p;
    const res = await ap.patch(`${basePath}/milestones/${id}`, {
      json: rest,
      headers: { authorization: user.idToken },
    });
    return { ok: res.ok };
  }
  //edit program
  await ap.patch(basePath, {
    headers: { authorization: user.idToken },
    json: p,
  });

  return { __ok: "Program updated" } satisfies ActionData;
};
