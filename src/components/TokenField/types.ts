import type { TokenWithDetails } from "types/tx";

type Classes = {
  container?: string;
  label?: string;
  inputContainer?: string;
};

export type Props = {
  token: TokenWithDetails;
  error?: string;
  onChange: (token: TokenWithDetails) => void;
  label: string;
  classes?: Classes;
  disabled?: boolean;

  withBalance?: true;
  withMininum?: true;
};
