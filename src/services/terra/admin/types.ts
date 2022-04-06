import { EmbeddedBankMsg, EmbeddedWasmMsg } from "contracts/types";

export type Member = {
  addr: string;
  weight: number;
};

export type MemberRes = {
  members: Member[];
};

export type InquiredMember = {
  weight: number | null;
};

export type ProposalsRes = {
  proposals: Proposal[];
};

export type ProposalStatus =
  | "pending"
  | "open"
  | "rejected"
  | "passed"
  | "executed";
export type Proposal = {
  id: number; //1
  title: string; //"this prpposal rocks"
  description: string; //"this is a description"
  meta?: string; //JSON string that contains preview metadata
  msgs: (EmbeddedWasmMsg | EmbeddedBankMsg)[];
  status: ProposalStatus;
  expires: { at_height: number };
  threshold: {
    //others absolute account, threshold quourum
    absolute_percentage: {
      percentage: string; //"0.5"
      total_weight: number; //2
    };
  };
};

export type CW3Config = {
  group_addr: string; //"terra123abc.."
  threshold: {
    absolute_percentage: {
      percentage: string; //"0.5"
    };
  };
  max_voting_period: {
    height: number; //1000
  };
  isPlacholder?: true;
  //...future needed attr
};

export type VoteInfo = {
  voter: string; //"terra123abc.."
  vote: "yes" | "no";
  weight: number; //1
};

export type VoteListRes = {
  votes: VoteInfo[];
};
