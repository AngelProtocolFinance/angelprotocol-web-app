import { NewAIF } from "types/contracts/evm";
import { Tupleable } from "types/evm";

export const txs = {
  "accounts.create-endowment": {},
};

interface NewTransaction extends Tupleable {
  title: string;
  description: string;
  destination: string;
  value: string;
  data: string;
}

type Tx<T extends Tupleable> = {
  tags: string[]; //tags to invalidate
  payload: T;
};

type Txs = {
  "accounts.create-endowment": Tx<NewAIF>;
  "accounts/settings.update-controller": Tx<NewAIF>;
  //create and sign
  "multisig.add-transaction": Tx<NewTransaction>;
};

export type TxTypes = keyof Txs;

export type TxArgs<T extends TxTypes> = Txs[T]["payload"];
