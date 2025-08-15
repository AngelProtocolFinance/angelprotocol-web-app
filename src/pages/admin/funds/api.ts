import type { Endow } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import { getFundsNpoMemberOf } from ".server/funds";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  user: UserV2;
  funds: FundItem[];
  endow: Endow;
}

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const endow = await getEndow(adm.id);
  const funds = await getFundsNpoMemberOf(endow.id, {
    npoProfileFeatured: false,
  });
  return { endow, funds, user: adm } satisfies LoaderData;
};

export const action: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await adm.req.formData();
  await ap.post(
    `${ver(8)}/endowments/${adm.id}/funds/${fv.get("fund_id")}/opt-out`,
    { headers: { authorization: adm.idToken } }
  );
  return {
    __ok: "You have successfully opted out of this fund. Changes will take effect shortly.",
  } satisfies ActionData;
};
