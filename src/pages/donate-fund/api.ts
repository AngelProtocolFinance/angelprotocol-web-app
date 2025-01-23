import type { SingleFund } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import { parse, pipe, string, uuid } from "valibot";
import { cognito } from ".server/auth";
import { getFund } from ".server/fund";

export interface LoaderData {
  user: UserV2 | null;
  fund: SingleFund;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user } = await cognito.retrieve(request);
  const id = parse(pipe(string(), uuid()), params.fundId);
  const fund = await getFund(id);
  if (!fund) throw new Response(null, { status: 404 });

  return {
    user,
    fund,
  } satisfies LoaderData;
};
