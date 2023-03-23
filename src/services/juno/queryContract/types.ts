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
  Simulation,
  VotesPageOptions,
} from "types/contracts";

type Addr = { addr: string };
export interface ContractQueries {
  regConfig: {
    args: null;
    res: Q<RegistrarConfig>;
    result: RegistrarConfig;
    contract: "registrar";
  };
  regConfigExtension: {
    args: null;
    res: Q<RegistrarConfigExtension>;
    result: RegistrarConfigExtension;
    contract: "registrar";
  };

  ifFunds: {
    args: null;
    res: Q<{ funds: FundDetails[] }>;
    result: FundDetails[];
    contract: "index-fund";
  };
  ifAlliance: {
    args: null;
    res: Q<{ alliance_members: AllianceMember[] }>;
    result: AllianceMember[];
    contract: "index-fund";
  };
  ifConfig: {
    args: null;
    res: Q<IndexFundConfig>;
    result: IndexFundConfig;
    contract: "index-fund";
  };

  lpSimul: {
    args: null;
    res: Q<Simulation>;
    result: Simulation;
    contract: unknown;
  };

  giftcardBalance: {
    args: Addr;
    res: Q<GenericBalance>;
    result: Token[];
    contract: "gift-card";
  };

  govStaker: {
    args: Addr;
    res: Q<GovStaker>;
    result: GovStaker;
    contract: "gov";
  };
  govState: { args: null; res: Q<GovState>; result: GovState; contract: "gov" };
  govConfig: {
    args: null;
    res: Q<GovConfig>;
    result: GovConfig;
    contract: "gov";
  };
  govPolls: {
    args: null;
    res: Q<Polls>;
    result: Polls["polls"];
    contract: "gov";
  };

  cw20Info: {
    args: null;
    res: Q<CW20Info>;
    result: CW20Info;
    contract: unknown;
  };
  cw20Balance: {
    args: Addr;
    res: Q<CW20Balance>;
    result: number;
    contract: unknown;
  };

  cw4Members: {
    args: null;
    res: Q<{ members: CW4Member[] }>;
    result: CW4Member[];
    contract: unknown;
  };
  cw4Member: {
    args: Addr;
    res: Q<InquiredMember>;
    result: InquiredMember;
    contract: unknown;
  };

  cw3Voter: {
    args: Addr;
    res: Q<InquiredMember>;
    result: InquiredMember;
    contract: unknown;
  };
  cw3ListVoters: {
    args: null;
    res: Q<CW3ListVoters>;
    result: CW3ListVoters;
    contract: unknown;
  };
  cw3Config: {
    args: null;
    res: Q<CW3Config>;
    result: CW3Config;
    contract: unknown;
  };
  reviewCw3Config: {
    args: null;
    res: Q<ReviewCW3Config>;
    result: ReviewCW3Config;
    contract: unknown;
  };
  cw3Proposals: {
    args: PageOptions;
    res: Q<{ proposals: Proposal[] }>;
    result: Proposal[];
    contract: unknown;
  };
  cw3Proposal: {
    args: { id: number };
    res: Q<Proposal>;
    result: Proposal;
    contract: unknown;
  };
  cw3Votes: {
    args: VotesPageOptions;
    res: Q<{ votes: AdminVoteInfo[] }>;
    result: AdminVoteInfo[];
    contract: unknown;
  };

  airdropIsClaimed: {
    args: Addr & { stage: number };
    res: Q<any>;
    result: any;
    contract: unknown;
  }; //TODO update once to be used

  accEndowment: {
    args: { id: number };
    res: Q<EndowmentDetails>;
    result: EndowmentDetails;
    contract: "accounts";
  };
  accState: {
    args: { id: number };
    res: Q<EndowmentState>;
    result: EndowmentState;
    contract: "accounts";
  };

  vaultBalance: {
    args: { endowment_id: number };
    res: Q<string>;
    result: string;
    contract: unknown;
  };

  endowmentController: {
    args: { id: number };
    res: Q<EndowmentController>;
    result: EndowmentController;
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
