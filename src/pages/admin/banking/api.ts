import { new_bank as schema } from "@better-giving/banking-applications/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import { adminRoutes } from "constants/routes";
import * as v from "valibot";
import { admin_checks, is_resp } from "../utils";
import { new_bank } from ".server/banking-applications";

export const action: ActionFunction = async (args) => {
  const adm = await admin_checks(args);
  if (is_resp(adm)) return adm;

  const payload = await args.request.json();
  const x = v.parse(schema, payload);

  await new_bank(x);

  return redirect(`../${adminRoutes.banking}`);
};
