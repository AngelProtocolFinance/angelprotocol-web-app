import {
  AccountType,
  EndowmentDetails,
  EndowmentState,
  GenericBalMap,
  IndexFundConfig,
  RegistrarConfig,
} from "types/contracts";
import { PageOptions, Transaction } from "types/contracts/multisig";
import { Contract } from "types/lists";

type Addr = { addr: string };

type Query<Args, Result> = {
  args: Args;
  transform: (result: string, args?: Args) => Result;
};

export interface ContractQueries {
  "registrar.config": Query<null, RegistrarConfig>;
  "index-fund.config": Query<null, IndexFundConfig>;
  "gift-card.balance": Query<Addr, GenericBalMap>;

  "erc20.balance": Query<Addr, string>;
  "erc20.allowance": Query<{ owner: string; spender: string }, string>;

  "multisig.members": Query<null, string[]>;
  "multisig.txs": Query<PageOptions, Pick<Transaction, "id" | "status">[]>;
  "multisig.threshold": Query<null, number>;
  "multisig.require-execution": Query<null, boolean>;
  "multisig.transaction": Query<{ id: number }, Transaction>;
  "multisig.tx-count": Query<{ pending: boolean; executed: boolean }, number>;
  "multisig.votes": Query<{ id: number }, string[]>;

  "accounts.endowment": Query<{ id: number }, EndowmentDetails>;
  "accounts.state": Query<{ id: number }, EndowmentState>;
  "accounts.token-balance": Query<
    { id: number; accounType: AccountType; token: string },
    string
  >;
}

export type ContractQueryTypes = keyof ContractQueries;

type Empty = { [key: string]: never };
type QueryArgs<T extends ContractQueryTypes> = ContractQueries[T]["args"];

export type QueryOptions<T extends ContractQueryTypes> =
  T extends `${infer C}.${string}`
    ? C extends Contract
      ? //if args is also null, options is empty
        QueryArgs<T> extends null
        ? Empty
        : QueryArgs<T>
      : //if contract address is not hardcoded, need to supply
        Record<C, string> & (QueryArgs<T> extends null ? {} : QueryArgs<T>)
    : Empty;
