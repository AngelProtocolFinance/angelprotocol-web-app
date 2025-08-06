import type { LoaderFunction } from "@vercel/remix";
import { admin_checks, is_resp } from "pages/admin/utils";
import type { PayoutMethod } from "types/applications";
import { npo_banks } from ".server/banking-applications/banking-applications";

export interface LoaderData {
  methods: PayoutMethod[];
}

export const loader: LoaderFunction = async (x) => {
  const admn = await admin_checks(x);
  if (is_resp(admn)) return admn;

  const items = await npo_banks(admn.id);
  return { methods: items } satisfies LoaderData;
};
