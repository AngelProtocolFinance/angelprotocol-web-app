import type { Endow } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import type { ActionFunction, LoaderFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionData } from "types/action";

export interface LoaderData {
  funds: FundItem[];
  endow: Endow;
}

export const clientLoader: LoaderFunction = async ({ params }) => {
  const endow = await getEndow(params.id);
  const funds = await ap
    .get<FundItem[]>(`${ver(8)}/endowments/${params.id}/funds`)
    .json();

  return { endow, funds } satisfies LoaderData;
};

export const clientAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv = await request.formData();
  await ap.post(
    `${ver(8)}/endowments/${params.id}/funds/${fv.get("fund_id")}/opt-out`,
    {
      headers: { authorization: auth?.idToken },
    }
  );
  return {
    __ok: "You have successfully opted out of this fund. Changes will take effect shortly.",
  } satisfies ActionData;
};
