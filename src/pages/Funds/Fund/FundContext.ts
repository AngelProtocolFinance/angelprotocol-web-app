import { isEmpty } from "helpers";
import { createContext, useContext } from "react";
import type { Fund } from "types/aws";

export const FundContext = createContext<Fund>({} as Fund);

export const useFundContext = (): Fund => {
  const val = useContext(FundContext);

  if (isEmpty(Object.entries(val))) {
    throw new Error("useFundContext should only be used inside FundContext");
  }
  return val;
};
