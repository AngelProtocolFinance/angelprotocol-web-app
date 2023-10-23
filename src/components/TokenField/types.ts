import { FieldValues, Path, PathValue } from "react-hook-form";
import { TokenWithAmount } from "types/tx";

export type OnSetAmount = (balance: TokenWithAmount["balance"]) => void;

type Classes = {
  container?: string;
  label?: string;
  inputContainer?: string;
};

export type Props<T extends FieldValues, K extends Path<T>> = {
  name: PathValue<T, K> extends TokenWithAmount ? K : never;
  label: string;
  selectedChainId: string;
  userWalletAddress?: string;
  classes?: Classes;
  disabled?: boolean;

  withBalance?: true;
  withMininum?: true;
};

export type SelectorProps = {
  selectedChainId: string;
  userWalletAddress?: string;
  selectedToken: TokenWithAmount;
  onChange(token: TokenWithAmount): void;
};

export type AmountOptionsProps = {
  token: TokenWithAmount;
  onSetAmount: OnSetAmount;
};
