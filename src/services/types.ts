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
  endowmentId: number; //reaching this means id is valid and can be safely converted to number
  cw3config: CW3Config;
  proposalLink: SuccessLink;
  isAp: boolean;
};

export type ProposalDetails = Proposal & {
  votes: AdminVoteInfo[];
};

export type JunoTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "endowment"
  | "registrar"
  | "custom";

export type Country = {
  flags: { png?: string; svg?: string };
  name: {
    common: string;
  };
};

export type CountryOption = {
  name: string;
  flag: string;
};

/** multicall */
export type WithBalance<T = Token> = T & { balance: number };
