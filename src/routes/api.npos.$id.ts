import { npo_search } from "@better-giving/endowment/schema";
import { $int_gte1, segment } from "@better-giving/schemas";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { npodb } from ".server/aws/db";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = v.parse(v.union([$int_gte1, segment]), params.id);
  const s = Object.fromEntries(new URL(request.url).searchParams.entries());
  const { fields } = v.parse(npo_search, s);

  const npo = await npodb.npo(id, fields);
  if (!npo) return resp.status(404);
  return resp.json(npo);
};
