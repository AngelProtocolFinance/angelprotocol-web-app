import { denoms } from "constants/currency";
import { FC } from "react";

export interface DonateValues {
  amount: string;
  split_liq: string;
  //metadata;
  currency: denoms.ether | denoms.uluna | denoms.bnb; //denoms.btc | denoms.sol | denoms.uatom;
  min_liq: number;
  max_liq: number;
  to: "tca" | "fund" | "charity";
  receiver?: number | string;
}

interface FromTCA {
  to: "tca";
  receiver?: never;
  max_liq?: never;
  min_liq?: never;
}

interface ToFund {
  to: "fund";
  receiver?: number;
  max_liq?: number;
  min_liq?: number;
}

interface ToCharity {
  to: "charity";
  receiver: string;
  //doesn't know yet limits on charity donations
  max_liq?: number;
  min_liq?: number;
}

export type FundFlow = ToFund | ToCharity | FromTCA;
export type Props = FundFlow & { Form: FC };
