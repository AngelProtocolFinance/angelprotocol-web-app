import type { SingleFund } from "@better-giving/fundraiser";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData {
  fund: SingleFund;
  user: UserV2;
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const fund = await ap
    .get<SingleFund>(`${ver(1)}/funds/${params.fundId}`)
    .json();

  return { fund, user } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const { close = false, ...update } = await request.json();

  if (close) {
    await ap
      .post<unknown>(`${ver(1)}/funds/${params.fundId}/close`, {
        headers: { authorization: user.idToken },
      })
      .json();
    return { __ok: "Fund closed" } satisfies ActionData;
  }

  await ap
    .patch<SingleFund>(`${ver(1)}/funds/${params.fundId}`, {
      json: update,
      headers: { authorization: user.idToken },
    })
    .json();

  return { __ok: "Fund updated" } satisfies ActionData;
};
