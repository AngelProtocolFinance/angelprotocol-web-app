import { donations_search } from "@better-giving/donation/schema";
import { search } from "helpers/https";
import { parse } from "valibot";
import { endowUpdate } from "../endow-update-action";
import type { Route } from "./+types";
import { dondb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const loader = async (x: Route.LoaderArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const { limit = 10, ...q } = parse(donations_search, search(x.request));
  const page = await dondb.list_to_npo(adm.id, { ...q, limit });

  return page;
};

export const action = endowUpdate({ redirect: "." });
