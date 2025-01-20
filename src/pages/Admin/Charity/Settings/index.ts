import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { getEndow } from "api/get/endow";
import type { EndowmentSettingsAttributes } from "types/aws";
import { endowUpdate } from "../endow-update-action";
export { default } from "./Form";
export { ErrorBoundary } from "components/error";

const fields: EndowmentSettingsAttributes[] = [
  "receiptMsg",
  "hide_bg_tip",
  "progDonationsAllowed",
  "donateMethods",
  "target",
];
export const loader: LoaderFunction = async ({ params }) =>
  getEndow(params.id, fields);

export const action: ActionFunction = endowUpdate({
  success: "Settings updated",
});
