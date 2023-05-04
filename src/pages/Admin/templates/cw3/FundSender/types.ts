import { ProposalBase } from "../../../types";
import { TokenWithAmount } from "types/slices";

export type FormValues = ProposalBase & {
  token: TokenWithAmount;
  recipient: string;
};
