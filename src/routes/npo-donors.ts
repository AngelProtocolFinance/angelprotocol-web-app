import { fund_id } from "@better-giving/fundraiser/schema";
import { $int_gte1 } from "@better-giving/schemas";
import { search } from "helpers/https";
import type { LoaderFunction } from "react-router";
import * as v from "valibot";
import { npo_donors } from ".server/npo-donors";

const schema = v.union([fund_id, $int_gte1]);

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = v.parse(schema, params.id);

  const { next } = search(request);

  const page = await npo_donors(id.toString(), next);
  return new Response(JSON.stringify(page), {
    headers: { "content-type": "application/json" },
  });
};
