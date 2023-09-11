import {
  AccountType,
  EndowmentDetails,
  EndowmentState,
  FeeSetting,
  FeeType,
  FundDetails,
  GenericBalMap,
  IndexFundConfig,
  RegistrarConfig,
  StrategyParams,
} from "types/contracts";
import { Contract } from "types/lists";

type Addr = { addr: string };
type ID = { id: number };

type Query<Args, Result> = {
  args: Args;
  transform: (result: string, args?: Args) => Result;
};

export interface ContractQueries {
  "registrar.config": Query<null, RegistrarConfig>;
  "registrar.owner": Query<null, string>;
  "registrar.fee-setting": Query<{ type: FeeType }, FeeSetting>;
  "registrar.strategy-ids": Query<null, string[]>;
  "registrar.strategy-params": Query<{ id: string }, StrategyParams>;

  "index-fund.config": Query<null, IndexFundConfig>;
  "index-fund.fund": Query<ID, FundDetails>;
  "gift-card.balance": Query<Addr, GenericBalMap>;

  "erc20.balance": Query<Addr, string>;
  "erc20.allowance": Query<{ owner: string; spender: string }, string>;

  "accounts.endowment": Query<ID, EndowmentDetails>;
  "accounts.state": Query<ID, EndowmentState>;
  "accounts.is-daf": Query<ID, boolean>;
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
