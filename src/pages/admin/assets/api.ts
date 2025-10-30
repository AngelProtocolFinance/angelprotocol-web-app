import { $int_gte1 } from "@better-giving/schemas";
import { resp } from "helpers/https";
import type { LoaderFunctionArgs } from "react-router";
import { parse } from "valibot";
import { npodb } from ".server/aws/db";

export interface LoaderData {
  base_url: string;
  logo?: string;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const id = parse($int_gte1, params.id);
  const base_url = new URL(request.url).origin;
  const npo = await npodb.npo(id, ["logo"]);
  if (!npo) throw resp.status(404);

  return {
    base_url,
    ...npo,
  } satisfies LoaderData;
};
