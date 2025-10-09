import { new_bank as schema } from "@better-giving/banking-applications/schema";
import { type ActionFunction, redirect } from "react-router";
import * as v from "valibot";
import { routes } from "../routes";
import { bappdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const action: ActionFunction = async (args) => {
  const adm = await admin_checks(args);
  if (is_resp(adm)) return adm;

  const payload = await args.request.json();
  const x = v.parse(schema, payload);

  await bappdb.bapp_put({ ...x, rejectionReason: "" });

  return redirect(`../${routes.banking}`);
};
