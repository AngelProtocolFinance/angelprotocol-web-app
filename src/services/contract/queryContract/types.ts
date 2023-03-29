import {
  AdminVoteInfo,
  AllianceMember,
  CW3Config,
  CW3ListVoters,
  CW4Member,
  CW20Balance,
  CW20Info,
  EndowmentController,
  EndowmentDetails,
  EndowmentState,
  FundDetails,
  GenericBalance,
  GovConfig,
  GovStaker,
  GovState,
  IndexFundConfig,
  InquiredMember,
  PageOptions,
  Polls,
  Proposal,
  QueryRes as Q,
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

  "index-fund.funds": Query<null, FundDetails[]>;

  "index-fund.alliance-members": Query<null, AllianceMember[]>;

  "index-fund.config": Query<null, IndexFundConfig>;

  "gift-card.balance": Query<Addr, GenericBalance>;

  "gov.staker": Query<Addr, GovStaker>;
  "gov.state": Query<null, GovState>;
  "gov.config": Query<null, GovConfig>;
  "gov.polls": Query<null, Polls["polls"]>;

  "cw20.info": Query<null, CW20Info>;
  "cw20.balance": Query<Addr, string>;

  "cw4.members": Query<null, CW4Member[]>;
  "cw4.member": Query<Addr, InquiredMember>;

  "cw3.voter": Query<Addr, InquiredMember>;
  "cw3.voters": Query<null, string[]>;
  "cw3.config": Query<null, CW3Config>;
  "cw3.proposals": Query<PageOptions, Proposal[]>; //not implemented
  "cw3.proposal": Query<{ id: number }, Proposal>; //not implemented
  "cw3.votes": Query<VotesPageOptions, AdminVoteInfo[]>;

  "accounts.endowment": Query<{ id: number }, EndowmentDetails>;
  "accounts.state": Query<{ id: number }, EndowmentState>;

  "accounts/settings.controller": Query<{ id: number }, EndowmentController>; //included in endowDetails
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
        { [key in C]: string } & (QueryArgs<T> extends null ? {} : QueryArgs<T>)
    : Empty;
