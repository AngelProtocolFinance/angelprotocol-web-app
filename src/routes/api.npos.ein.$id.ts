import { reg_number } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { npodb } from ".server/aws/db";

export const loader: LoaderFunction = async ({ params }) => {
  const id = v.parse(reg_number, params.id);
  const res = npodb.npo_with_regnum(id);
  return resp.json(res);
};
