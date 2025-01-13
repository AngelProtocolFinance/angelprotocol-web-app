import type { Endow } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { cognito, redirectToAuth } from "auth";
import type { ActionData } from "types/action";

export interface LoaderData {
  funds: FundItem[];
  endow: Endow;
}

export const loader: LoaderFunction = async ({ params }) => {
  const endow = await getEndow(params.id);
  const funds = await ap
    .get<FundItem[]>(`${ver(8)}/endowments/${params.id}/funds`)
    .json();

  return { endow, funds } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const fv = await request.formData();
  await ap.post(
    `${ver(8)}/endowments/${params.id}/funds/${fv.get("fund_id")}/opt-out`,
    { headers: { authorization: user.idToken } }
  );
  return {
    __ok: "You have successfully opted out of this fund. Changes will take effect shortly.",
  } satisfies ActionData;
};
