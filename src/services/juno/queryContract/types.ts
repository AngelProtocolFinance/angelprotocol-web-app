import {
  AdminVoteInfo,
  AllianceMember,
  BalanceInfo,
  CW3Config,
  CW20Balance,
  CW20Info,
  CategorizedEndowments,
  EndowmentDetails,
  EndowmentEntry,
  EndowmentQueryOptions,
  FundDetails,
  GovConfig,
  GovStaker,
  GovState,
  IndexFundConfig,
  InquiredMember,
  Member,
  PageOptions,
  Polls,
  Profile,
  Proposal,
  QueryRes as Q,
  RegistrarConfig,
  Simulation,
  VotesPageOptions,
} from "types/server/contracts";

type EndowmentListRes = { endowments: EndowmentEntry[] };

type Addr = { addr: string };
export interface ContractQueries {
  regEndowList: {
    args: EndowmentQueryOptions;
    res: Q<EndowmentListRes>;
    result: EndowmentEntry[];
  };
  regCategorizedEndows: {
    args: EndowmentQueryOptions;
    res: Q<EndowmentListRes>;
    result: CategorizedEndowments;
  };
  regVaultRates: { args: null; res: Q<any>; result: any }; //TODO update this
  regConfig: { args: null; res: Q<RegistrarConfig>; result: RegistrarConfig };

  ifFunds: {
    args: null;
    res: Q<{ funds: FundDetails[] }>;
    result: FundDetails[];
  };
  ifAlliance: {
    args: null;
    res: Q<{ alliance_members: AllianceMember[] }>;
    result: AllianceMember[];
  };
  ifConfig: { args: null; res: Q<IndexFundConfig>; result: IndexFundConfig };

  lpSimul: { args: null; res: Q<Simulation>; result: Simulation };

  govStaker: { args: Addr; res: Q<GovStaker>; result: GovStaker };
  govState: { args: null; res: Q<GovState>; result: GovState };
  govConfig: { args: null; res: Q<GovConfig>; result: GovConfig };
  govPolls: { args: null; res: Q<Polls>; result: Polls["polls"] };

  cw20Info: { args: null; res: Q<CW20Info>; result: CW20Info };
  cw20Balance: { args: Addr; res: Q<CW20Balance>; result: number };

  cw4Members: { args: null; res: Q<{ members: Member[] }>; result: Member[] };
  cw4Member: { args: Addr; res: Q<InquiredMember>; result: InquiredMember };

  cw3Voter: { args: Addr; res: Q<InquiredMember>; result: InquiredMember };
  cw3Config: { args: null; res: Q<CW3Config>; result: CW3Config };
  cw3Propsosals: {
    args: PageOptions;
    res: Q<{ proposals: Proposal[] }>;
    result: Proposal[];
  };
  cw3Proposal: { args: { id: number }; res: Q<Proposal>; result: Proposal };
  cw3Votes: {
    args: VotesPageOptions;
    res: Q<{ votes: AdminVoteInfo[] }>;
    result: AdminVoteInfo[];
  };

  airdropIsClaimed: {
    args: Addr & { stage: number };
    res: Q<any>;
    result: any;
  }; //TODO update once to be used

  accEndowment: {
    args: null;
    res: Q<EndowmentDetails>;
    result: EndowmentDetails;
  };
  accBalance: { args: null; res: Q<BalanceInfo>; result: BalanceInfo };
  accProfile: { args: null; res: Q<Profile>; result: Profile };
}

export type ContractQueryTypes = keyof ContractQueries;
export type Args<T extends ContractQueryTypes> = ContractQueries[T]["args"];
export type WithAddrArgs<T extends ContractQueryTypes> =
  ContractQueries[T]["args"] extends null
    ? string
    : ContractQueries[T]["args"] & { contract: string };
export type Res<T extends ContractQueryTypes> = ContractQueries[T]["res"];
export type Result<T extends ContractQueryTypes> = ContractQueries[T]["result"];
