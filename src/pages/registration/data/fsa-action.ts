import { type FsaPayload, signer } from "@better-giving/registration/fsa";
import { type ActionFunction, redirect } from "@vercel/remix";
import { regRoutes } from "constants/routes";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { gen_fsa_signing_url } from ".server/registration/gen-fsa-signing-url";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const content_type = request.headers.get("content-type");
  const signer_payload =
    content_type === "application/json"
      ? await request.json()
      : await request.formData().then((fv) => fv.get("signer_eid")?.toString());

  const x = parse(signer, signer_payload);

  const from = new URL(request.url);
  from.pathname = `register/${params.regId}/${regRoutes.sign_result}`;
  from.search = "";
  const payload: FsaPayload = {
    signer: x,
    redirectUrl: from.toString(),
  };
  const to = await gen_fsa_signing_url(payload);
  return redirect(to);
};
