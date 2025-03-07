import type { SingleFund } from "@better-giving/fundraiser";
import { fundId } from "@better-giving/fundraiser/schema";
import type { LoaderFunction } from "@vercel/remix";
import { segment } from "api/schema/segment";
import type { UserV2 } from "types/auth";
import { parse, union } from "valibot";
import { cognito } from ".server/auth";
import { getFund } from ".server/fund";

export interface LoaderData {
  user: UserV2 | null;
  fund: SingleFund;
}

const schema = union([fundId, segment]);

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user } = await cognito.retrieve(request);
  const id = parse(schema, params.fundId);
  const fund = await getFund(id);
  if (!fund) throw new Response(null, { status: 404 });

  return {
    user,
    fund,
  } satisfies LoaderData;
};
