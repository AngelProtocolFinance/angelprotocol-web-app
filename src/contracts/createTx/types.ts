import { NewAIF } from "types/contracts/evm";
import { Tupleable } from "types/evm";
import { Contract } from "types/lists";

interface NewTransaction extends Tupleable {
  title: string;
  description: string;
  destination: string;
  value: string;
  data: string;
}

type Tx<T extends Tupleable> = {
  tags: string[]; //tags to invalidate.
  /**
   * or create static map
   * [event_topic]: query_tag[]
   *
   * after tx, for each log, if log.topic in map, invalidate query_tag[]
   */
  payload: T;
};

type Txs = {
  "accounts.create-endowment": Tx<NewAIF>;
  "accounts/settings.update-controller": Tx<NewAIF>;
  //create and sign
  "cw3.add-transaction": Tx<NewTransaction>;
};

export type TxTypes = keyof Txs;
export type TxPayload<T extends TxTypes> = Txs[T]["payload"];

export const txs: { [T in TxTypes]: (payload: TxPayload<T>) => string } = {
  "accounts.create-endowment": () => "",
  "accounts/settings.update-controller": () => "",
  "cw3.add-transaction": () => "",
};

type Empty = { [key: string]: never };
export type TxOptions<T extends TxTypes> = T extends `${infer C}.${string}`
  ? C extends Contract
    ? Txs[T]["payload"]
    : { [key in C]: string } & Txs[T]["payload"]
  : Empty;

function createTx<T extends TxTypes>(type: T, options: TxOptions<T>) {}
// createTx("accounts.create-endowment", {})
