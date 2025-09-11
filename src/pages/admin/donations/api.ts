import { search } from "helpers/https";
import type { LoaderFunctionArgs } from "react-router";
import type { Donation } from "types/donations";
import { endowUpdate } from "../endow-update-action";
import { get_donations } from ".server/donations";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  items: Donation.Item[];
  next?: string;
}

export const loader = async (x: LoaderFunctionArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const { page: pn = "1" } = search(adm.req);

  const page = await get_donations({
    asker: adm.id,
    status: "final",
    page: +pn,
  });

  return page;
};

export const action = endowUpdate({ redirect: "." });
