import { Token } from "types/aws";
import {
  AdminVoteInfo,
  AllianceMember,
  CW3Config,
  CW3ListVoters,
  CW4Member,
  CW20Balance,
  CW20Info,
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
  ReviewCW3Config,
  Simulation,
  VotesPageOptions,
} from "types/contracts";

type Addr = { addr: string };
export interface ContractQueries {
  regConfig: { args: null; res: Q<RegistrarConfig>; result: RegistrarConfig };

  ifFund: {
    args: { fund_id: number };
    res: Q<FundDetails>;
    result: FundDetails;
  };
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

  giftcardBalance: {
    args: Addr;
    res: Q<GenericBalance>;
    result: Token[];
  };

  govStaker: { args: Addr; res: Q<GovStaker>; result: GovStaker };
  govState: { args: null; res: Q<GovState>; result: GovState };
  govConfig: { args: null; res: Q<GovConfig>; result: GovConfig };
  govPolls: { args: null; res: Q<Polls>; result: Polls["polls"] };

  cw20Info: { args: null; res: Q<CW20Info>; result: CW20Info };
  cw20Balance: { args: Addr; res: Q<CW20Balance>; result: number };

  cw4Members: {
    args: null;
    res: Q<{ members: CW4Member[] }>;
    result: CW4Member[];
  };
  cw4Member: { args: Addr; res: Q<InquiredMember>; result: InquiredMember };

  cw3Voter: { args: Addr; res: Q<InquiredMember>; result: InquiredMember };
  cw3ListVoters: { args: null; res: Q<CW3ListVoters>; result: CW3ListVoters };
  cw3Config: { args: null; res: Q<CW3Config>; result: CW3Config };
  reviewCw3Config: {
    args: null;
    res: Q<ReviewCW3Config>;
    result: ReviewCW3Config;
  };
  cw3Proposals: {
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
    args: { id: number };
    res: Q<EndowmentDetails>;
    result: EndowmentDetails;
  };
  accState: {
    args: { id: number };
    res: Q<EndowmentState>;
    result: EndowmentState;
  };

  vaultBalance: {
    args: { endowment_id: number };
    res: Q<string>;
    result: string;
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
