import { $int_gte1 } from "@better-giving/schemas";
import { resp } from "helpers/https";
import type { LoaderFunction } from "react-router";
import { parse } from "valibot";
import { npodb } from ".server/aws/db";

export const loader: LoaderFunction = async ({ params }) => {
  const id = parse($int_gte1, params.id);
  const res = await npodb.npo_programs(id);
  return resp.json(res);
};
