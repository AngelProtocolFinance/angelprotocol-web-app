import type { IFsaSigner } from "@better-giving/reg";
import { Progress } from "@better-giving/reg/progress";

import {
  type IFsaDocs,
  fsa_docs_or_signer,
  reg_id,
} from "@better-giving/reg/schema";
import { regRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router";
import { parse } from "valibot";
import { cognito, to_auth } from ".server/auth";
import { regdb } from ".server/aws/db";
import { gen_fsa_signing_url } from ".server/registration/gen-fsa-signing-url";
import { reg_id_from_signer_eid } from ".server/registration/helpers";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const content_type = request.headers.get("content-type");
  const payload =
    content_type === "application/json"
      ? // documentation form
        await request.json()
      : // sign-result page
        await request.formData().then((fv) => fv.get("signer_eid")?.toString());

  const docs_or_eid = parse(fsa_docs_or_signer, payload);

  // re-generate from existing signer
  if (typeof docs_or_eid === "string") {
    const rid = await reg_id_from_signer_eid(docs_or_eid);
    const reg = await regdb.reg(rid);
    if (!reg) throw `registration not found: ${rid}`;
    const r = new Progress(reg).docs_fsa;
    if (!r) throw `registration: ${rid} doesn't contain fsa docs`;

    const from = new URL(request.url);
    from.pathname = `register/${rid}/${regRoutes.sign_result}`;
    from.search = "";

    const docs: IFsaDocs = {
      o_registration_number: r.o_registration_number,
      o_legal_entity_type: r.o_legal_entity_type,
      o_project_description: r.o_project_description,
      o_proof_of_reg: r.o_website,
      r_proof_of_identity: r.r_proof_of_identity,
    };

    const signer: IFsaSigner = {
      first_name: r.r_first_name,
      last_name: r.r_last_name,
      email: reg.r_id,
      role:
        r.r_org_role === "other" ? (r.r_org_role_other ?? "") : r.r_org_role,
      org_name: r.o_name,
      org_hq_country: r.o_hq_country,
      docs,
    };
    const url = await gen_fsa_signing_url(rid, signer, from.toString());

    await regdb.reg_update(rid, { status: "01", o_fsa_signing_url: url });

    return redirect(url);
  }

  const rid = parse(reg_id, params.regId);
  const reg = await regdb.reg(rid);
  if (!reg) throw `registration not found: ${rid}`;
  const r = new Progress(reg).org_type;
  if (!r) throw `registration not ready for FSA signing: ${rid}`;

  const from = new URL(request.url);
  from.pathname = `register/${rid}/${regRoutes.sign_result}`;
  from.search = "";

  const signer: IFsaSigner = {
    first_name: r.r_first_name,
    last_name: r.r_last_name,
    email: reg.r_id,
    role: r.r_org_role === "other" ? (r.r_org_role_other ?? "") : r.r_org_role,
    org_hq_country: r.o_hq_country,
    org_name: r.o_name,
    docs: docs_or_eid,
  };

  const url = await gen_fsa_signing_url(rid, signer, from.toString());

  await regdb.reg_update(rid, {
    ...docs_or_eid,
    status: "01",
    o_fsa_signing_url: url,
  });

  return redirect(url);
};
