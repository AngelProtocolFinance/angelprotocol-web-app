import { createContext, useContext } from "react";
import type { IFund } from "types/fund";

export const FundContext = createContext<IFund>({} as IFund);

export const useFundContext = (): IFund => {
  const val = useContext(FundContext);

  if (Object.entries(val).length === 0) {
    throw new Error("useFundContext should only be used inside FundContext");
  }
  return val;
};
