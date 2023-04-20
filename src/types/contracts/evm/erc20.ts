import { Tupleable } from "../../evm";

export interface Transfer extends Tupleable {
  to: string;
  amount: string; //scaled amount
}

export interface Allowance extends Tupleable {
  spender: string;
  amount: string;
}
