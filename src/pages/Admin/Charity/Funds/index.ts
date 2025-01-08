import type { FundItem } from "@better-giving/fundraiser";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionFunction, LoaderFunction } from "react-router";
import type { ActionData } from "types/action";
import type { LoaderData } from "./types";

export { default } from "./Funds";

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
  await ap.post(`${ver(8)}/endowments/${params.id}/funds/${params.fundId}`, {
    headers: { authorization: auth?.idToken },
  });
  return {
    __ok: "You have successfully opted out of this fund. Changes will take effect shortly.",
  } satisfies ActionData;
};
