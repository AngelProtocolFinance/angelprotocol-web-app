import { FieldValues, Path, PathValue } from "react-hook-form";
import { TokenWithAmount } from "types/tx";

export type OnSetAmount = (balance: TokenWithAmount["balance"]) => void;

/** min amount multipliers 
   e.g if min_amount is $1,
   with scale of [10, 20, 50, 100, 200]
   amount options would be 10, 20 50, 100 ( 200 | max)
  */
type Scale = [number, number, number, number, number];

type Classes = {
  container?: string;
  label?: string;
  inputContainer?: string;
};

export type Props<T extends FieldValues, K extends Path<T>> = {
  name: PathValue<T, K> extends TokenWithAmount ? K : never;
  label: string;
  tokens: TokenWithAmount[];
  scale?: Scale;
  classes?: Classes;
  disabled?: boolean;

  withBalance?: true;
  withMininum?: true;
};

export type SelectorProps = {
  token: TokenWithAmount;
  tokens: TokenWithAmount[];
  onChange(token: TokenWithAmount): void;
};

export type AmountOptionsProps = {
  token: TokenWithAmount;
  scale: Scale;
  onSetAmount: OnSetAmount;
};
