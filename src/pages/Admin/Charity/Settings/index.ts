import type { LoaderFunction } from "@remix-run/react";
import { getEndow } from "api/get/endow";
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
