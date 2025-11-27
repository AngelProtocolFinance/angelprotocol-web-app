import { resp } from "helpers/https";
import type { IForm } from "lib/forms";
import type { Route } from "./+types";
import { formsdb, npodb } from ".server/aws/db";

export interface IRecipient {
  name: string;
  hide_bg_tip?: boolean;
  donor_address_required?: boolean;
}

export interface ILoader extends IForm {
  recipient_details: IRecipient;
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const form = await formsdb.form_get(params.id);
  if (!form) throw resp.err(404, "form not found");

  const x = await npodb.npo(+form.recipient, [
    "name",
    "hide_bg_tip",
    "donor_address_required",
  ]);
  if (!x) throw resp.err(404, "recipient not found");

  return { ...form, recipient_details: x } satisfies ILoader;
};
