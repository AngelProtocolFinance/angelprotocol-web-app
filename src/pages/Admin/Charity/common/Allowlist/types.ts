import { Operation } from "../../../Context";

export type Props = {
  initial: string[];
  type: "beneficiary" | "contributor" | "maturity";
  operation: Operation;
  title: string;
  memberName: string;
  emptyMessage: string;
  classes?: string;
};

export type FormValues = {
  type: Props["type"];
  initial: string[];
  addresses: string[];
};
