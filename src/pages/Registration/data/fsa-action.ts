import type { FsaPayload } from "@better-giving/registration/fsa";
import { type ActionFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";
import { regRoutes } from "constants/routes";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const contentType = request.headers.get("content-type");
  const signer =
    contentType === "application/json"
      ? await request.json()
      : await request.formData().then((fv) => fv.get("signer_eid")?.toString());

  const from = new URL(request.url);
  from.pathname = `register/${params.regId}/${regRoutes.sign_result}`;
  from.search = "";
  const payload: FsaPayload = {
    signer,
    redirectUrl: from.toString(),
  };

  const { url: to } = await ap
    .post<{ url: string }>(`${ver(1)}/registration-fsa`, {
      json: payload,
      headers: { authorization: user.idToken },
    })
    .json();

  return redirect(to);
};
