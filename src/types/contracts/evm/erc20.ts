import { Tupleable } from "types/evm";

export interface Transfer extends Tupleable {
  to: string;
  amount: string; //scaled amount
}
