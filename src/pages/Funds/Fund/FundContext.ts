import type { SingleFund } from "@better-giving/fundraiser";
import { isEmpty } from "helpers";
import { createContext, useContext } from "react";

export const FundContext = createContext<SingleFund>({} as SingleFund);

export const useFundContext = (): SingleFund => {
  const val = useContext(FundContext);

  if (isEmpty(Object.entries(val))) {
    throw new Error("useFundContext should only be used inside FundContext");
  }
  return val;
};
