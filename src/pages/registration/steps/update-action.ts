import type { IRegUpdateDb } from "@better-giving/reg";
import { Progress } from "@better-giving/reg/progress";
import { reg_id, reg_update } from "@better-giving/reg/schema";
import { resp } from "helpers/https";
import { type ActionFunction, redirect } from "react-router";
import { parse } from "valibot";
import { cognito, to_auth } from ".server/auth";
import { regdb } from ".server/aws/db";

const changed = <T extends boolean | string | number | undefined>(a: T, b: T) =>
  a != null && b != null && a !== b;

export const update_action =
  (next: string): ActionFunction =>
  async ({ request, params }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return to_auth(request, headers);

    const rid = parse(reg_id, params.regId);
    const upd8 = parse(reg_update, await request.json());

    const reg = await regdb.reg(rid);
    if (!reg) throw resp.status(404, `reg:${rid} not found`);

    // approved
    if (reg.status === "03") {
      throw resp.status(400, `reg:${rid} already approved`);
    }

    if (reg.r_id !== user.email && !user.groups.includes("ap-admin")) {
      throw resp.status(401);
    }
    const b = regdb.reg_update_build({ ...upd8, status: "01" });

    //resets
    type K = keyof IRegUpdateDb;
    const prog = new Progress(reg);
    const done_fsa_url = prog.fsa_url;

    const contact_changed =
      upd8.update_type === "contact" &&
      (changed(reg.r_first_name, upd8.r_first_name) ||
        changed(reg.r_last_name, upd8.r_last_name) ||
        changed(reg.o_name, upd8.o_name) ||
        changed(reg.r_org_role, upd8.r_org_role));

    // a change in fsa country -> US doesn't mean NPO is 501c3
    if (done_fsa_url && contact_changed) {
      b.remove("o_fsa_signing_url" satisfies K);
      b.remove("o_fsa_signed_doc_url" satisfies K);
    }

    const country_changed_from_US =
      upd8.update_type === "org" &&
      changed(reg.o_hq_country, upd8.o_hq_country) &&
      upd8.o_hq_country !== "United States";

    const done_o_type = prog.org_type;
    const done_ein = prog.docs_ein;
    const done = done_o_type || done_ein;
    if (done && done.o_type === "501c3" && country_changed_from_US) {
      b.remove("o_type" satisfies K);
      b.remove("o_ein" satisfies K);
    }

    await regdb.reg_update(rid, b);

    if (prog.step === 6) return redirect(`../${6}`);
    return redirect(`../${next}`);
  };
