import {
  AccountType,
  EndowmentDetails,
  EndowmentState,
  FundDetails,
  GenericBalMap,
  IndexFundConfig,
  RegistrarConfig,
} from "types/contracts";
import { ApplicationProposal, PageOptions } from "types/contracts/multisig";
import { Contract } from "types/lists";
import { Transaction } from "types/tx";

type Addr = { addr: string };
type ID = { id: number };

type Query<Args, Result> = {
  args: Args;
  transform: (result: string, args?: Args) => Result;
};

export interface ContractQueries {
  "registrar.config": Query<null, RegistrarConfig>;
  "registrar.owner": Query<null, string>;

  "index-fund.config": Query<null, IndexFundConfig>;
  "index-fund.fund": Query<ID, FundDetails>;
  "gift-card.balance": Query<Addr, GenericBalMap>;

  "erc20.balance": Query<Addr, string>;
  "erc20.allowance": Query<{ owner: string; spender: string }, string>;

  "multisig.members": Query<null, string[]>;
  "multisig.txs": Query<PageOptions, Pick<Transaction, "id" | "status">[]>;
  "multisig.threshold": Query<null, number>;
  "multisig.require-execution": Query<null, boolean>;
  "multisig.transaction": Query<ID, Transaction>;
  "multisig.is-owner": Query<Addr, boolean>;
  "multisig.tx-count": Query<{ open: boolean; approved: boolean }, number>;
  "multisig.votes": Query<ID, string[]>;
  "multisig.tx-duration": Query<null, number>;

  "multisig/review-proposal": Query<ID, ApplicationProposal>;

  "accounts.endowment": Query<ID, EndowmentDetails>;
  "accounts.state": Query<ID, EndowmentState>;
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
