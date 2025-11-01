import type { Route } from "./+types";
import { formsdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const loader = async (x: Route.LoaderArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const forms = await formsdb.forms_owned_by(adm.id.toString());
  return forms;
};
