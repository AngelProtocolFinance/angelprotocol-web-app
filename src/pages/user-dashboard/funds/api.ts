import type { IFund } from "@better-giving/fundraiser";
import type { Route } from "./+types/funds";
import { cognito, to_auth } from ".server/auth";
import { funddb, userdb } from ".server/aws/db";

export interface LoaderData {
  funds: IFund[];
}

export const user_funds = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const user_funds = await userdb.user_funds(user.email);
  const funds = await funddb.funds_get(user_funds);

  return { funds } satisfies LoaderData;
};
