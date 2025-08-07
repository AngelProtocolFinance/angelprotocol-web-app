import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getProgram } from "api/get/program";

import type { ActionData } from "types/action";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async ({ params }) =>
  getProgram(params.id, params.programId);
export const action: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const basePath = `${ver(1)}/endowments/${adm.id}/programs/${adm.params.programId}`;

  const { intent, ...p } = await adm.req.json();

  if (intent === "add-milestone") {
    const res = await ap.post(`${basePath}/milestones`, {
      headers: { authorization: adm.idToken },
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
      headers: { authorization: adm.idToken },
    });
    return { ok: res.ok };
  }

  if (intent === "edit-milestone") {
    const { "milestone-id": id, ...rest } = p;
    const res = await ap.patch(`${basePath}/milestones/${id}`, {
      json: rest,
      headers: { authorization: adm.idToken },
    });
    return { ok: res.ok };
  }
  //edit program
  await ap.patch(basePath, {
    headers: { authorization: adm.idToken },
    json: p,
  });

  return { __ok: "Program updated" } satisfies ActionData;
};
