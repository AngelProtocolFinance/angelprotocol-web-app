import {
  AdminVoteInfo,
  AllianceMember,
  BalanceInfo,
  CW3Config,
  CW20Balance,
  CW20Info,
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
  RegistrarConfig,
  Simulation,
  VotesPageOptions,
} from "types/server/contracts";

type Addr = { addr: string };
//prettier-ignore
export interface ContractQueries {
  regEndowList:      { args: EndowmentQueryOptions;    return: { endowments: EndowmentEntry[] } };
  regVaultRates:     { args: null;                     return: any }; //TODO update this
  regConfig:         { args: null;                     return: RegistrarConfig };

  ifFunds:           { args: null;                     return: { funds: FundDetails[] }};
  ifAlliance:        { args: null;                     return: { alliance_members: AllianceMember[] }};
  ifConfig:          { args: null;                     return: IndexFundConfig };

  lpSimul:           { args: null;                     return: Simulation };

  govStaker:         { args: Addr;                     return: GovStaker };
  govState:          { args: null;                     return: GovState };
  govConfig:         { args: null;                     return: GovConfig };
  govPolls:          { args: null;                     return: Polls };

  cw20Info:          { args: null;                     return: CW20Info };
  cw20Balance:       { args: Addr;                     return: CW20Balance };

  cw4Members:        { args: null;                     return: { members: Member[]} };
  cw4Member:         { args: Addr;                     return: InquiredMember };

  cw3Voter:          { args: Addr;                     return: InquiredMember };
  cw3Config:         { args: null;                     return: CW3Config };
  cw3Propsosals:     { args: PageOptions;              return: { proposals: Proposal[] } };
  cw3Proposal:       { args: { id: number };           return: Proposal };
  cw3Votes:          { args: VotesPageOptions;         return: { votes: AdminVoteInfo[];} };

  airdropIsClaimed: { args: Addr & { stage: number };  return: any }; //TODO update once to be used

  accEndowment:      { args: null;                     return: EndowmentDetails };
  accBalance:        { args: null;                     return: BalanceInfo };
  accProfile:        { args: null;                     return: Profile };
}

export type ContractQueryTypes = keyof ContractQueries;
