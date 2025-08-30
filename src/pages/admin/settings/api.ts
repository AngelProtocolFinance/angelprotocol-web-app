import type { INpo } from "@better-giving/endowment";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import type { EndowmentSettingsAttributes } from "types/npo";
import { endowUpdate } from "../endow-update-action";
import { npodb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData
  extends Pick<INpo, "id" | EndowmentSettingsAttributes> {}

const fields: EndowmentSettingsAttributes[] = [
  "receiptMsg",
  "hide_bg_tip",
  "progDonationsAllowed",
  "donateMethods",
  "target",
];
export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const n = await npodb.npo(adm.id, fields);
  if (!n) return { status: 404 };
  return { ...n, id: adm.id } satisfies LoaderData;
};

export const action: ActionFunction = endowUpdate({
  success: "Settings updated",
});
