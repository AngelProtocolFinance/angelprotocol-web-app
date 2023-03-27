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

type Addr = { addr: string };

type Query<Args, Res, Result, Contract> = {
  args: Args;
  res: Res;
  transform: (res: Res) => Result;
  contract: Contract;
};

export interface ContractQueries {
  regConfig: Query<null, Q<RegistrarConfig>, RegistrarConfig, "registrar">;

  regConfigExtension: Query<
    null,
    Q<RegistrarConfigExtension>,
    RegistrarConfigExtension,
    "registrar"
  >;

  ifFunds: Query<
    null,
    Q<{ funds: FundDetails[] }>,
    FundDetails[],
    "index-fund"
  >;

  ifAlliance: Query<
    null,
    Q<{ alliance_members: AllianceMember[] }>,
    AllianceMember[],
    "index-fund"
  >;

  ifConfig: Query<null, Q<IndexFundConfig>, IndexFundConfig, "index-fund">;

  giftcardBalance: Query<Addr, Q<GenericBalance>, GenericBalance, "gift-card">;

  govStaker: Query<Addr, Q<GovStaker>, GovStaker, "gov">;
  govState: Query<null, Q<GovState>, GovState, "gov">;
  govConfig: Query<null, Q<GovConfig>, GovConfig, "gov">;
  govPolls: Query<null, Q<Polls>, Polls["polls"], "gov">;

  cw20Info: Query<null, Q<CW20Info>, CW20Info, unknown>;
  cw20Balance: Query<Addr, Q<CW20Balance>, CW20Balance, unknown>;

  cw4Members: Query<null, Q<{ members: CW4Member[] }>, CW4Member[], unknown>;

  cw4Member: Query<Addr, Q<InquiredMember>, InquiredMember, unknown>;
  cw3Voter: Query<Addr, Q<InquiredMember>, InquiredMember, unknown>;

  cw3ListVoters: Query<null, Q<CW3ListVoters>, string[], unknown>;

  cw3Config: Query<null, Q<CW3Config>, CW3Config, unknown>;
  cw3Proposals: Query<
    PageOptions,
    Q<{ proposals: Proposal[] }>,
    Proposal[],
    unknown
  >;
  cw3Proposal: Query<{ id: number }, Q<Proposal>, Proposal, unknown>;

  cw3Votes: Query<
    VotesPageOptions,
    Q<{ votes: AdminVoteInfo[] }>,
    AdminVoteInfo[],
    unknown
  >;
  accEndowment: Query<
    { id: number },
    Q<EndowmentDetails>,
    EndowmentDetails,
    "accounts"
  >;

  accState: Query<
    { id: number },
    Q<EndowmentState>,
    EndowmentState,
    "accounts"
  >;
  endowmentController: Query<
    { id: number },
    Q<EndowmentController>,
    EndowmentController,
    "accounts/settings"
  >;
}

export type ContractQueryTypes = keyof ContractQueries;
