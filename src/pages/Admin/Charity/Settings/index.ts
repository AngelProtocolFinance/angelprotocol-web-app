import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { apiEnv } from "services/constants";
import type { EndowmentSettingsAttributes } from "types/aws";

export { default as Component } from "./Form";

const fields: EndowmentSettingsAttributes[] = [
  "receiptMsg",
  "hide_bg_tip",
  "progDonationsAllowed",
  "donateMethods",
];
export const loader: LoaderFunction = async ({ params }) => {
  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);
  url.searchParams.set("fields", fields.join(","));
  url.pathname = `v9/endowments/${params.id}`;

  //Pick<Endowment, "id" | EndowmentSettingsAttributes>;
  return cacheGet(url);
};
