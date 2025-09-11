import type { IBapp } from "@better-giving/banking-applications";
import type { LoaderFunction } from "react-router";
import { bappdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  methods: IBapp[];
}

export const loader: LoaderFunction = async (x) => {
  const admn = await admin_checks(x);
  if (is_resp(admn)) return admn;

  const page = await bappdb.npo_bapps(admn.id);
  return { methods: page.items } satisfies LoaderData;
};
