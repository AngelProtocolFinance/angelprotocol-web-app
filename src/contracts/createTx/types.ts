import { SettingsControllerUpdate } from "types/contracts";
import { NewAIF } from "types/contracts/evm";
import { Transfer } from "types/contracts/evm/erc20";
import { NewTransaction } from "types/contracts/evm/multisig";
import { Tupleable } from "types/evm";
import { Contract } from "types/lists";

type Tx<T extends Tupleable> = {
  tags: string[]; //tags to invalidate.
  /**
   * or create static map
   * [event_topic]: query_tag[]
   *
   * after tx, for each log, if log.topic in map, invalidate query_tag[]
   */
  args: T;
};

type Txs = {
  "accounts.create-endowment": Tx<NewAIF>;
  "accounts.update-controller": Tx<SettingsControllerUpdate>;

  "multisig.submit-transaction": Tx<NewTransaction>;
  "multisig.add-owner": Tx<{ address: string }>;
  "multisig.confirm-tx": Tx<{ id: number }>;

  "erc20.transfer": Tx<Transfer>;
};

export type TxTypes = keyof Txs;
export type TxArgs<T extends TxTypes> = Txs[T]["args"];

type Empty = { [key: string]: never };
export type TxOptions<T extends TxTypes> = T extends `${infer C}.${string}`
  ? C extends Contract
    ? Txs[T]["args"]
    : { [key in C]: string } & Txs[T]["args"]
  : Empty;
