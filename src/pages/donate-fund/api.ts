import type { Program } from "@better-giving/endowment";
import type { SingleFund } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@remix-run/react";
import { getFiatCurrencies } from "api/get/fiat-currencies";
import { getFund } from "api/get/fund";
import type { FiatCurrencies } from "api/types";
import { loadAuth } from "auth";

export interface LoaderData {
  fund: SingleFund;
  /** need to await */
  currencies: Promise<FiatCurrencies>;
  programs: Promise<Program[]>;
}

export const clientLoader: LoaderFunction = async ({ params }) => {
  const auth = await loadAuth();

  return {
    fund: await getFund(params.fundId),
    currencies: getFiatCurrencies(auth ?? undefined),
    programs: Promise.resolve([]),
  } satisfies LoaderData;
};
