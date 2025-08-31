import type { UserFund } from "@better-giving/user";
import { ap, ver } from "api/api";
import type { LoaderFunction } from "react-router";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData {
  funds: UserFund[];
}

export const userFunds: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const funds = await ap
    .get<UserFund[]>(`${ver(3)}/users/${user.email}/funds`, {
      headers: { authorization: user.idToken },
    })
    .json();
  return { funds } satisfies LoaderData;
};
