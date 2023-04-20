import { ProposalBase } from "../../../../types";

export type Config = {
  fundRotation: number;
  fundMemberLimit: number;
  fundingGoal: number;
};

export type FormValues = ProposalBase & Config & { initial: Config };
