import type { IForm } from "@better-giving/forms";
import { resp } from "helpers/https";
import type { Route } from "./+types";
import { formsdb } from ".server/aws/db";
import { type IRecipient, recipient_fn } from ".server/helpers/form";

export interface ILoader extends IForm {
  recipient_details: IRecipient;
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const form = await formsdb.form_get(params.id);
  if (!form) throw resp.err(404, "form not found");

  const r = await recipient_fn(form.recipient, form.recipient_type, form.owner);
  if (!r) throw resp.err(500, "recipient not found");
  return { ...form, recipient_details: r } satisfies ILoader;
};
