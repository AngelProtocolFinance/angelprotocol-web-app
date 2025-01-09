import type { SingleFund } from "@better-giving/fundraiser";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionFunction, LoaderFunction } from "react-router";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";

export interface LoaderData {
  fund: SingleFund;
  user: UserV2;
}
export const clientLoader: LoaderFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  const fund = await ap
    .get<SingleFund>(`${ver(1)}/funds/${params.fundId}`)
    .json();

  return { fund, user: auth } satisfies LoaderData;
};

export const clientAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const { close = false, ...update } = await request.json();

  if (close) {
    await ap
      .post<unknown>(`${ver(1)}/funds/${params.fundId}/close`, {
        headers: { authorization: auth.idToken },
      })
      .json();
    return { __ok: "Fund closed" } satisfies ActionData;
  }

  await ap
    .patch<SingleFund>(`${ver(1)}/funds/${params.fundId}`, {
      json: update,
      headers: { authorization: auth.idToken },
    })
    .json();

  return { __ok: "Fund updated" } satisfies ActionData;
};
