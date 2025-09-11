import type { IProgramDb } from "@better-giving/endowment";
import { program_id } from "@better-giving/endowment/schema";
import { adminRoutes } from "constants/routes";
import { type LoaderFunction, redirect } from "react-router";
import { parse } from "valibot";
import { npodb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  programs: IProgramDb[];
}

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const programs = await npodb.npo_programs(adm.id);
  return { programs } satisfies LoaderData;
};

export const action: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  if (adm.req.method === "DELETE") {
    const fv = await adm.req.formData();
    const pid = parse(program_id, fv.get("programId"));
    await npodb.npo_prog_del(adm.id, pid);
    return { ok: true };
  }

  //new program
  const id = await npodb.npo_program_put(adm.id, {
    title: "New Program",
    description: "Program description",
    milestones: [],
  });

  return redirect(`../${adminRoutes.program_editor}/${id}`);
};
