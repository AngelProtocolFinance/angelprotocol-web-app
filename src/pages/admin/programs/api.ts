import type { NewProgram, Program } from "@better-giving/endowment";
import { type LoaderFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getPrograms } from "api/get/programs";
import { adminRoutes } from "constants/routes";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  programs: Program[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const programs = await getPrograms(params.id);
  return { programs } satisfies LoaderData;
};

export const action: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  if (adm.req.method === "DELETE") {
    const progId = await adm.req.formData().then((f) => f.get("programId"));
    await ap.delete(`${ver(2)}/endowments/${adm.id}/programs/${progId}`, {
      headers: { authorization: adm.idToken },
    });

    return { ok: true };
  }

  const { id } = await ap
    .post<{ id: string }>(`${ver(1)}/endowments/${adm.id}/programs`, {
      headers: { authorization: adm.idToken },
      json: {
        title: "New Program",
        description: "Program description",
        milestones: [],
      } satisfies NewProgram,
    })
    .json();

  return redirect(`../${adminRoutes.program_editor}/${id}`);
};
