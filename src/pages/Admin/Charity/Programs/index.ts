import { type LoaderFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getPrograms } from "api/get/programs";
import { cognito, redirectToAuth } from "auth";
import { adminRoutes } from "constants/routes";

export { default } from "./Programs";

export const loader: LoaderFunction = async ({ params }) =>
  getPrograms(params.id);

export const action: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

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
      json: await request.json(),
    })
    .json();

  return redirect(`../${adminRoutes.program_editor}/${id}`);
};
