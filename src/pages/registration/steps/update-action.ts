import type { IRegUpdateDb } from "@better-giving/reg";
import { Progress } from "@better-giving/reg/progress";
import { reg_id, reg_update } from "@better-giving/reg/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import { resp } from "helpers/https";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { regdb } from ".server/aws/db";

const changed = <T extends boolean | string | number | undefined>(a: T, b: T) =>
  a != null && b != null && a !== b;

export const update_action =
  (next: string): ActionFunction =>
  async ({ request, params }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return toAuth(request, headers);

    const rid = parse(reg_id, params.regId);
    const upd8 = parse(reg_update, await request.json());

    const reg = await regdb.reg(rid);
    if (!reg) throw resp.status(404, `reg:${rid} not found`);

    if (reg.r_id !== user.email && !user.groups.includes("ap-admin")) {
      throw resp.status(401);
    }
    const b = regdb.reg_update_build({ ...upd8, status: "01" });

    //resets
    type K = keyof IRegUpdateDb;
    const prog = new Progress(reg);
    const done_fsa_url = prog.step4_fsa_url;

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

    const US = /united states/i;
    const country_changed_from_US =
      upd8.update_type === "org" &&
      !US.test(upd8.o_hq_country || "") &&
      US.test(reg.o_hq_country || "");

    const done_o_type = prog.step3;
    const done_ein = prog.step4;
    const done = done_o_type || done_ein;
    if (done && done.o_type === "501c3" && country_changed_from_US) {
      b.remove("o_type" satisfies K);
      b.remove("o_ein" satisfies K);
    }

    await regdb.reg_update(rid, b);

    if (prog.step === 6) return redirect(`../${6}`);
    return redirect(`../${next}`);
  };
