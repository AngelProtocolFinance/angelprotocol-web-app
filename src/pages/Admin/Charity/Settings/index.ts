import { getEndow } from "api/get/endow";
import type { LoaderFunction } from "react-router-dom";
import type { EndowmentSettingsAttributes } from "types/aws";
export { default as Component } from "./Form";

const fields: EndowmentSettingsAttributes[] = [
  "receiptMsg",
  "hide_bg_tip",
  "progDonationsAllowed",
  "donateMethods",
  "target",
];
export const loader: LoaderFunction = async ({ params }) =>
  getEndow(params.id, fields);

export { action } from "../endow-update-action";
