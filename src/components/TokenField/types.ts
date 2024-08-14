import type { Chain } from "types/chain";
import type { TokenWithAmount } from "types/tx";

type Classes = {
  container?: string;
  label?: string;
  inputContainer?: string;
};

export type Props = {
  token: TokenWithAmount;
  error?: string;
  chainId: Chain.Id.All | "";
  onChange: (token: TokenWithAmount) => void;
  label: string;
  classes?: Classes;
  disabled?: boolean;

  withBalance?: true;
  withMininum?: true;
};
