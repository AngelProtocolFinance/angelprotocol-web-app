import { Tupleable } from "../../evm";

export interface PageOptions extends Tupleable {
  startAfter: number;
  limit: number;
}
