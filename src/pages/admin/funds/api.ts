import type { Endow } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import type { ActionFunction, LoaderFunction } from "react-router";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import { cognito, toAuth } from ".server/auth";
import { getFundsNpoMemberOf } from ".server/funds";

export interface LoaderData {
  user: UserV2;
  funds: FundItem[];
  endow: Endow;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const endow = await getEndow(params.id);
  const funds = await getFundsNpoMemberOf(endow.id, {
    npoProfileFeatured: false,
  });
  return { endow, funds, user } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const fv = await request.formData();
  await ap.post(
    `${ver(8)}/endowments/${params.id}/funds/${fv.get("fund_id")}/opt-out`,
    { headers: { authorization: user.idToken } }
  );
  return {
    __ok: "You have successfully opted out of this fund. Changes will take effect shortly.",
  } satisfies ActionData;
};
