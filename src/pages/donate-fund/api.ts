import type { SingleFund } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@vercel/remix";
import { getFund } from "api/get/fund";
import { cognito } from "auth";
import type { UserV2 } from "types/auth";

export interface LoaderData {
  user: UserV2 | null;
  fund: SingleFund;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user } = await cognito.retrieve(request);

  return {
    user,
    fund: await getFund(params.fundId),
  } satisfies LoaderData;
};
