import { ProposalBase } from "../../../types";
import { TokenWithAmount } from "types/tx";

export type FormValues = ProposalBase & {
  token: TokenWithAmount;
  recipient: string;
};
