import { Tuple, Tupleable } from "../../evm";

export interface NewTransaction extends Tupleable {
  title: string;
  description: string;
  destination: string;
  value: string;
  data: string;
}

export interface NewOwner extends Tupleable {
  address: string;
}
