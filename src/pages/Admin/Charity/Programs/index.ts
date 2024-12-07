import { ap, ver } from "api/api";
import { getPrograms } from "api/get/programs";
import { loadAuth, redirectToAuth } from "auth";
import { adminRoutes } from "constants/routes";
import { type LoaderFunction, redirect } from "react-router-dom";

export { default as Component } from "./Programs";

export const loader: LoaderFunction = async ({ params }) =>
  getPrograms(params.id);

export const action: LoaderFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  if (request.method === "DELETE") {
    const progId = await request.formData().then((f) => f.get("programId"));
    await ap.delete(`${ver(2)}/endowments/${params.id}/programs/${progId}`, {
      headers: { authorization: auth.idToken },
    });

    return { ok: true };
  }

  const { id } = await ap
    .post<{ id: string }>(`${ver(1)}/endowments/${params.id}/programs`, {
      headers: { authorization: auth.idToken },
      json: await request.json(),
    })
    .json();

  return redirect(`../${adminRoutes.program_editor}/${id}`);
};
