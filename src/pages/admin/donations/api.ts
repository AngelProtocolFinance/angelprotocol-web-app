import type { LoaderFunction } from "@vercel/remix";
import type { Donation } from "types/donations";
import { endowUpdate } from "../endow-update-action";
import { get_donations } from ".server/donations";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  items: Donation.Item[];
  next?: string;
}

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const from = new URL(adm.req.url);
  const pageNum = from.searchParams.get("page") ?? "1";

  const page = await get_donations({
    asker: adm.id,
    status: "final",
    page: +pageNum,
  });

  return {
    items: page.items,
    next: page.next_page?.toString(),
  } satisfies LoaderData;
};

export const action = endowUpdate({ redirect: "." });
