import { getEndow } from "api/get/endow";
import { endowId } from "api/schema/endow-id";
import type { LoaderFunction } from "react-router-dom";
import type { EndowmentSettingsAttributes } from "types/aws";
import { parse } from "valibot";
export { default as Component } from "./Form";

const fields: EndowmentSettingsAttributes[] = [
  "receiptMsg",
  "hide_bg_tip",
  "progDonationsAllowed",
  "donateMethods",
];
export const loader: LoaderFunction = async ({ params }) =>
  getEndow(parse(endowId, params.id), fields);
