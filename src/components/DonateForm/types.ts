import { AccAddress } from "@terra-money/terra.js";
import { ReactNode } from "react";

export type Handler = () => void;

export interface Values {
  amount: string;
  split: number;
}

interface ToFund {
  to: "fund";
  receiver?: number;
  children: ReactNode;
  maxSplitLiq?: number;
  minSplitLiq?: number;
}

interface ToCharity {
  to: "charity";
  receiver: AccAddress;
  children: ReactNode;
  //doesn't know yet limits on charity donations
  maxSplitLiq?: never;
  minSplitLiq?: never;
}

export type Props = ToFund | ToCharity;
