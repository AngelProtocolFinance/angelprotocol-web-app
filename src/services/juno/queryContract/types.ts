import { Token } from "types/aws";
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
  ReviewCW3Config,
  VotesPageOptions,
} from "types/contracts";

type Addr = { addr: string };
export interface ContractQueries {
  regConfig: {
    args: null;
    res: Q<RegistrarConfig>;
    result: RegistrarConfig;
    transform: (res: Q<RegistrarConfig>) => RegistrarConfig;
    contract: "registrar";
  };
  regConfigExtension: {
    args: null;
    res: Q<RegistrarConfigExtension>;
    result: RegistrarConfigExtension;
    transform: (res: Q<RegistrarConfigExtension>) => RegistrarConfigExtension;
    contract: "registrar";
  };

  ifFunds: {
    args: null;
    res: Q<{ funds: FundDetails[] }>;
    result: FundDetails[];
    transform: (res: Q<{ funds: FundDetails[] }>) => FundDetails[];
    contract: "index-fund";
  };
  ifAlliance: {
    args: null;
    res: Q<{ alliance_members: AllianceMember[] }>;
    result: AllianceMember[];
    transform: (
      res: Q<{ alliance_members: AllianceMember[] }>
    ) => AllianceMember[];
    contract: "index-fund";
  };
  ifConfig: {
    args: null;
    res: Q<IndexFundConfig>;
    result: IndexFundConfig;
    transform: (res: Q<IndexFundConfig>) => IndexFundConfig;
    contract: "index-fund";
  };

  giftcardBalance: {
    args: Addr;
    res: Q<GenericBalance>;
    result: Token[];
    transform: (res: Q<GenericBalance>) => GenericBalance;
    contract: "gift-card";
  };

  govStaker: {
    args: Addr;
    res: Q<GovStaker>;
    result: GovStaker;
    transform: (res: Q<GovStaker>) => GovStaker;
    contract: "gov";
  };
  govState: {
    args: null;
    res: Q<GovState>;
    result: GovState;
    transform: (res: Q<GovState>) => GovState;
    contract: "gov";
  };
  govConfig: {
    args: null;
    res: Q<GovConfig>;
    result: GovConfig;
    transform: (res: Q<GovConfig>) => GovConfig;
    contract: "gov";
  };
  govPolls: {
    args: null;
    res: Q<Polls>;
    result: Polls["polls"];
    transform: (res: Q<Polls>) => Polls["polls"];
    contract: "gov";
  };

  cw20Info: {
    args: null;
    res: Q<CW20Info>;
    result: CW20Info;
    transform: (res: Q<CW20Info>) => CW20Info;
    contract: unknown;
  };
  cw20Balance: {
    args: Addr;
    res: Q<CW20Balance>;
    result: number;
    transform: (res: Q<CW20Balance>) => CW20Balance;
    contract: unknown;
  };

  cw4Members: {
    args: null;
    res: Q<{ members: CW4Member[] }>;
    result: CW4Member[];
    transform: (res: Q<{ members: CW4Member[] }>) => CW4Member[];
    contract: unknown;
  };
  cw4Member: {
    args: Addr;
    res: Q<InquiredMember>;
    result: InquiredMember;
    transform: (res: Q<InquiredMember>) => InquiredMember;
    contract: unknown;
  };

  cw3Voter: {
    args: Addr;
    res: Q<InquiredMember>;
    result: InquiredMember;
    transform: (res: Q<InquiredMember>) => InquiredMember;
    contract: unknown;
  };
  cw3ListVoters: {
    args: null;
    res: Q<CW3ListVoters>;
    result: CW3ListVoters;
    transform: (res: Q<CW3ListVoters>) => CW3ListVoters;
    contract: unknown;
  };
  cw3Config: {
    args: null;
    res: Q<CW3Config>;
    result: CW3Config;
    transform: (res: Q<CW3Config>) => CW3Config;
    contract: unknown;
  };
  reviewCw3Config: {
    args: null;
    res: Q<ReviewCW3Config>;
    result: ReviewCW3Config;
    transform: (res: Q<ReviewCW3Config>) => ReviewCW3Config;
    contract: unknown;
  };
  cw3Proposals: {
    args: PageOptions;
    res: Q<{ proposals: Proposal[] }>;
    result: Proposal[];
    transform: (res: Q<{ proposals: Proposal[] }>) => Proposal[];
    contract: unknown;
  };
  cw3Proposal: {
    args: { id: number };
    res: Q<Proposal>;
    result: Proposal;
    transform: (res: Q<Proposal>) => Proposal;
    contract: unknown;
  };
  cw3Votes: {
    args: VotesPageOptions;
    res: Q<{ votes: AdminVoteInfo[] }>;
    result: AdminVoteInfo[];
    transform(val: Q<{ votes: AdminVoteInfo[] }>): AdminVoteInfo[];
    contract: unknown;
  };

  accEndowment: {
    args: { id: number };
    res: Q<EndowmentDetails>;
    result: EndowmentDetails;
    transform: (res: Q<EndowmentDetails>) => EndowmentDetails;
    contract: "accounts";
  };
  accState: {
    args: { id: number };
    res: Q<EndowmentState>;
    result: EndowmentState;
    transform: (res: Q<EndowmentState>) => EndowmentState;
    contract: "accounts";
  };

  endowmentController: {
    args: { id: number };
    res: Q<EndowmentController>;
    result: EndowmentController;
    transform: (res: Q<EndowmentController>) => EndowmentController;
    contract: "accounts/settings";
  };
}

export type ContractQueryTypes = keyof ContractQueries;
export type Args<T extends ContractQueryTypes> = ContractQueries[T]["args"];
export type WithAddrArgs<T extends ContractQueryTypes> =
  ContractQueries[T]["args"] extends null
    ? string
    : ContractQueries[T]["args"] & { contract: string };
export type Res<T extends ContractQueryTypes> = ContractQueries[T]["res"];
export type Result<T extends ContractQueryTypes> = ContractQueries[T]["result"];
