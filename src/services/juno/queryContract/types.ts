import {
  AdminVoteInfo,
  AllianceMember,
  CW3Config,
  CW4Member,
  EndowmentDetails,
  EndowmentState,
  FundDetails,
  GenericBalance,
  IndexFundConfig,
  PageOptions,
  Proposal,
  RegistrarConfig,
  RegistrarConfigExtension,
  VotesPageOptions,
} from "types/contracts";
import { Contract } from "types/lists";

type Addr = { addr: string };

type Query<Args, Result> = {
  args: Args;
  transform: (result: string) => Result;
};

export interface ContractQueries {
  "registrar.config": Query<null, RegistrarConfig>;
  "registrar.config-extension": Query<null, RegistrarConfigExtension>;

  "index-fund.funds": Query<
    {
      startAfter: number;
      limit: number;
    },
    FundDetails[]
  >;
  "index-fund.alliance-members": Query<null, AllianceMember[]>;
  "index-fund.config": Query<null, IndexFundConfig>;

  "gift-card.balance": Query<Addr, GenericBalance>;

  "erc20.balance": Query<Addr, string>;

  "multisig.members": Query<null, CW4Member[]>;
  "multisig.proposals": Query<PageOptions, Proposal[]>;
  "multisig.config": Query<null, CW3Config>;
  "multisig.proposal": Query<{ id: number }, Proposal>;
  "multisig.votes": Query<VotesPageOptions, AdminVoteInfo[]>;

  "accounts.endowment": Query<{ id: number }, EndowmentDetails>;
  "accounts.state": Query<{ id: number }, EndowmentState>;
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
