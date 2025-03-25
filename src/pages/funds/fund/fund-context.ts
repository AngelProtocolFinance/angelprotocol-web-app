import type { SingleFund } from "@better-giving/fundraiser";
import { createContext, useContext } from "react";

export const FundContext = createContext<SingleFund>({} as SingleFund);

export const useFundContext = (): SingleFund => {
  const val = useContext(FundContext);

  if (Object.entries(val).length === 0) {
    throw new Error("useFundContext should only be used inside FundContext");
  }
  return val;
};
