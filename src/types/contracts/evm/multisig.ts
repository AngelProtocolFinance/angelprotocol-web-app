import { Tupleable } from "../../evm";

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

export interface TransactionIDsPageOptions extends Tupleable {
  from: number;
  to: number;
  pending: boolean;
  executed: boolean;
}
