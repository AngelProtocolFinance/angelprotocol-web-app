import { getEndow } from "api/get/endow";
import type { LoaderFunction } from "react-router";
import type { EndowmentSettingsAttributes } from "types/aws";
import { endowUpdate } from "../endow-update-action";
export { default } from "./Form";

const fields: EndowmentSettingsAttributes[] = [
  "receiptMsg",
  "hide_bg_tip",
  "progDonationsAllowed",
  "donateMethods",
  "target",
];
export const clientLoader: LoaderFunction = async ({ params }) =>
  getEndow(params.id, fields);

export const clientAction = endowUpdate({ success: "Settings updated" });
