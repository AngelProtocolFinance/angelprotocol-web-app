import type { UserFund } from "@better-giving/user";
import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from ".server/auth";

export interface LoaderData {
  funds: UserFund[];
}

export const userFunds: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const funds = await ap
    .get<UserFund[]>(`${ver(3)}/users/${user.email}/funds`, {
      headers: { authorization: user.idToken },
    })
    .json();
  return { funds } satisfies LoaderData;
};
