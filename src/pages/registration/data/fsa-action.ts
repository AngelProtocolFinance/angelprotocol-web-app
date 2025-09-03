import { type IFsaSigner, type IRegUpdate, Progress } from "@better-giving/reg";
import {
  type IFsaSignerDocs,
  fsa_signer_docs_or_eid,
  reg_id,
} from "@better-giving/reg/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import { regRoutes } from "constants/routes";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { regdb } from ".server/aws/db";
import { gen_fsa_signing_url } from ".server/registration/gen-fsa-signing-url";
import { reg_id_from_signer_eid } from ".server/registration/helpers";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const content_type = request.headers.get("content-type");
  const payload =
    content_type === "application/json"
      ? // documentation form
        await request.json()
      : // sign-result page
        await request.formData().then((fv) => fv.get("signer_eid")?.toString());

  const docs_or_eid = parse(fsa_signer_docs_or_eid, payload);

  // re-generate from existing signer
  if (typeof docs_or_eid === "string") {
    const rid = await reg_id_from_signer_eid(docs_or_eid);
    const reg = await regdb.reg(rid);
    if (!reg) throw `registration not found: ${rid}`;
    const r = new Progress(reg).step4_fsa;
    if (!r) throw `registration: ${rid} doesn't contain fsa docs`;

    const from = new URL(request.url);
    from.pathname = `register/${rid}/${regRoutes.sign_result}`;
    from.search = "";

    const docs: IFsaSignerDocs = {
      $o_registration_number: r.o_registration_number,
      $o_legal_entity_type: r.o_legal_entity_type,
      $o_project_description: r.o_project_description,
      $o_proof_of_reg: r.o_website,
      $r_proof_of_identity: r.r_proof_of_identity,
    };

    const signer: IFsaSigner = {
      first_name: r.r_first_name,
      last_name: r.r_last_name,
      email: reg.$r_id,
      role:
        r.r_org_role === "other" ? (r.r_org_role_other ?? "") : r.r_org_role,
      org_name: r.o_name,
      org_hq_country: r.o_hq_country,
      docs,
    };
    const url = await gen_fsa_signing_url(rid, signer, from.toString());
    return redirect(url);
  }

  const rid = parse(reg_id, params.regId);
  const reg = await regdb.reg(rid);
  if (!reg) throw `registration not found: ${rid}`;
  const r = new Progress(reg).step3;
  if (!r) throw `registration not ready for FSA signing: ${rid}`;

  const from = new URL(request.url);
  from.pathname = `register/${rid}/${regRoutes.sign_result}`;
  from.search = "";

  const signer: IFsaSigner = {
    first_name: r.r_first_name,
    last_name: r.r_last_name,
    email: reg.$r_id,
    role: r.r_org_role === "other" ? (r.r_org_role_other ?? "") : r.r_org_role,
    org_hq_country: r.o_hq_country,
    org_name: r.o_name,
    docs: docs_or_eid,
  };

  // update db with new docs
  const update: IRegUpdate = {
    update_type: "docs",
    ...docs_or_eid,
  };
  await regdb.reg_update(rid, reg, update);

  const url = await gen_fsa_signing_url(rid, signer, from.toString());
  return redirect(url);
};
