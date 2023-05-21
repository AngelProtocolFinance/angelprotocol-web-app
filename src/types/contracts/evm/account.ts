import { Tupleable } from "../../evm";

export type ADDRESS_ZERO = "0x0000000000000000000000000000000000000000" & {
  __type: "address_zero";
};

/**
 * 0 - endowment
 * 1 - indexfund
 * 2 - wallet
 * 3 - none
 */
export type Beneficiary = {
  data: {
    id: number; //for index-fund or endowment
    addr: string; // wallet
  };
  enumData: 0 | 1 | 2 | 3;
};

type DepositRequest = {
  id: number;
  lockedPercentage: number;
  liquidPercentage: number;
};

export interface ERC20Deposit extends Tupleable {
  details: DepositRequest;
  token: string;
  amount: string;
}
