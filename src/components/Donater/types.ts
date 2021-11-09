import { AccAddress } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import { ReactNode } from "react";

export interface Values {
  amount: number;
  split: string;
  currency: denoms.uusd | denoms.btc | denoms.ether;
  fee: number;
  loading: boolean;
  form_error: string;
}

export interface XFI {
  bitcoin?: any;
  ethereum?: any;
  //others to add if needed
}

export interface DWindow extends Window {
  ethereum: any;
  xfi?: XFI;
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
