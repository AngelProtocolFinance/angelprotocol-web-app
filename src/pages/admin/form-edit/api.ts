import { resp } from "helpers/https";
import type { Route } from "./+types";
import { formsdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const loader = async (x: Route.LoaderArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const form = await formsdb.form_get(x.params.form_id);
  if (!form) throw resp.err(404, "form not found");

  if (form.owner !== x.params.id) throw resp.err(403, "forbidden");

  return form;
};
