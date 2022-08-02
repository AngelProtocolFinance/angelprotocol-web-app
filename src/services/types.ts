import { SuccessLink } from "slices/transaction/types";
import { Token } from "types/server/aws";
import { AdminVoteInfo, CW3Config, Proposal } from "types/server/contracts";

export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
export type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

export type AdminResources = {
  cw3: string;
  cw4: string;
  endowment: string;
  cw3config: CW3Config;
  proposalLink: SuccessLink;
};

export type ProposalDetails = Proposal & {
  votes: AdminVoteInfo[];
};

export type JunoTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "endowment"
  | "multicall"
  | "registrar"
  | "custom";

/** multicall */
export type WithBalance<T = Token> = T & { balance: number };
