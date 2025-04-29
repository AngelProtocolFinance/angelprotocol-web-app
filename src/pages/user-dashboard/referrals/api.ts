import type { UserFund } from "@better-giving/user";
import type { LoaderFunction } from "@vercel/remix";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData {
  funds: UserFund[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  return user;
};
