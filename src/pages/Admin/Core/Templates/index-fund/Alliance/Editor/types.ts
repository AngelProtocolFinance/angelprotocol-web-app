import { ProposalBase } from "../../../../../types";

export type FormProps =
  | {
      address: string;
    } & (
      | { action: "add"; members: string[] }
      | { action: "remove"; members?: never }
    );
export type FormValues = ProposalBase & {
  address: string;
};
