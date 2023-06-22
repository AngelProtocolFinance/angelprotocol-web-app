import { ProposalBase } from "../../../types";

export type FormProps = {
  address: string;
  action: "remove" | "add";
};
export type FormValues = ProposalBase & {
  address: string;
};
