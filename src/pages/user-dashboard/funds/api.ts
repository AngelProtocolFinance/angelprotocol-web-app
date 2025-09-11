import type { IFund } from "@better-giving/fundraiser";
import type { LoaderFunction } from "react-router";
import { cognito, toAuth } from ".server/auth";
import { funddb, userdb } from ".server/aws/db";

export interface LoaderData {
  funds: IFund[];
}

export const userFunds: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const user_funds = await userdb.user_funds(user.email);
  const funds = await funddb.funds_get(user_funds);

  return { funds } satisfies LoaderData;
};
