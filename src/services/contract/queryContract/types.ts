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

type Query<Args, Res, Result> = {
  args: Args;
  res: Res;
  transform: (res: Res) => Result;
};

export interface ContractQueries {
  "registrar.config": Query<null, Q<RegistrarConfig>, RegistrarConfig>;

  "registrar.config-extension": Query<
    null,
    Q<RegistrarConfigExtension>,
    RegistrarConfigExtension
  >;

  "index-fund.funds": Query<null, Q<{ funds: FundDetails[] }>, FundDetails[]>;

  "index-fund.alliance-members": Query<
    null,
    Q<{ alliance_members: AllianceMember[] }>,
    AllianceMember[]
  >;

  "index-fund.config": Query<null, Q<IndexFundConfig>, IndexFundConfig>;

  "gift-card.balance": Query<Addr, Q<GenericBalance>, GenericBalance>;

  "gov.staker": Query<Addr, Q<GovStaker>, GovStaker>;
  "gov.state": Query<null, Q<GovState>, GovState>;
  "gov.config": Query<null, Q<GovConfig>, GovConfig>;
  "gov.polls": Query<null, Q<Polls>, Polls["polls"]>;

  "cw20.info": Query<null, Q<CW20Info>, CW20Info>;
  "cw20.balance": Query<Addr, Q<CW20Balance>, string>;

  "cw4.members": Query<null, Q<{ members: CW4Member[] }>, CW4Member[]>;
  "cw4.member": Query<Addr, Q<InquiredMember>, InquiredMember>;

  "cw3.voter": Query<Addr, Q<InquiredMember>, InquiredMember>;
  "cw3.voters": Query<null, Q<CW3ListVoters>, string[]>;
  "cw3.config": Query<null, Q<CW3Config>, CW3Config>;
  "cw3.proposals": Query<PageOptions, Q<{ proposals: Proposal[] }>, Proposal[]>;
  "cw3.proposal": Query<{ id: number }, Q<Proposal>, Proposal>;
  "cw3.votes": Query<
    VotesPageOptions,
    Q<{ votes: AdminVoteInfo[] }>,
    AdminVoteInfo[]
  >;

  "accounts.endowment": Query<
    { id: number },
    Q<EndowmentDetails>,
    EndowmentDetails
  >;

  "accounts.state": Query<{ id: number }, Q<EndowmentState>, EndowmentState>;
  "accounts/settings.controller": Query<
    { id: number },
    Q<EndowmentController>,
    EndowmentController
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
        { [key in C]: string } & (QueryArgs<T> extends null ? {} : QueryArgs<T>)
    : Empty;
