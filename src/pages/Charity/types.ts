import { EndowmentBalanceData } from "contracts/types";

export type CharityParam = { address: string };

export type State = {
  endowmentBalances: EndowmentBalanceData[];
};
