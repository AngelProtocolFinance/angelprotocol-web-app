import type { NewProgram, Program } from "@better-giving/endowment";
import { type LoaderFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getPrograms } from "api/get/programs";
import { adminRoutes } from "constants/routes";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData {
  programs: Program[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const programs = await getPrograms(params.id);
  return { programs } satisfies LoaderData;
};

export const action: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (request.method === "DELETE") {
    const progId = await request.formData().then((f) => f.get("programId"));
    await ap.delete(`${ver(2)}/endowments/${params.id}/programs/${progId}`, {
      headers: { authorization: user.idToken },
    });

    return { ok: true };
  }

  const { id } = await ap
    .post<{ id: string }>(`${ver(1)}/endowments/${params.id}/programs`, {
      headers: { authorization: user.idToken },
      json: {
        title: "New Program",
        description: "Program description",
        milestones: [],
      } satisfies NewProgram,
    })
    .json();

  return redirect(`../${adminRoutes.program_editor}/${id}`);
};
