import { denoms } from "constants/currency";
import { FC } from "react";

export interface Values {
  amount: string;
  split_liq: string;
  //metadata;
  currency: denoms.uusd | denoms.btc | denoms.ether | denoms.sol | denoms.uatom;
  min_liq: number;
  max_liq: number;
  to: "tca" | "fund" | "charity";
  receiver?: number | string;
}
export type ErrorHandler = (message: string, url?: string) => void;

export interface XFI {
  bitcoin?: any;
  ethereum?: any;
  //others to add if needed
}

export interface DWindow extends Window {
  ethereum: any;
  xfi?: XFI;
}

interface FromTCA {
  to: "tca";
  receiver?: never;
  Form: FC;
  max_liq?: never;
  min_liq?: never;
}

interface ToFund {
  to: "fund";
  receiver?: number;
  Form: FC;
  max_liq?: number;
  min_liq?: number;
}

interface ToCharity {
  to: "charity";
  receiver: string;
  Form: FC;
  //doesn't know yet limits on charity donations
  max_liq?: number;
  min_liq?: number;
}

export type Props = ToFund | ToCharity | FromTCA;
