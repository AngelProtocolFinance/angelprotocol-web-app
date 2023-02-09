import { FieldValues, Path } from "react-hook-form";
import { TokenWithAmount } from "types/slices";

export type OnSetAmount = (balance: TokenWithAmount["balance"]) => void;

/** min amount multipliers 
   e.g if min_amount is $1,
   with scale of [10, 20, 50, 100, 200]
   amount options would be 10, 20 50, 100 ( 200 | max)
  */
type Scale = [number, number, number, number, number];

export type Props<T extends FieldValues, K extends Path<T>> = {
  name: T[K] extends TokenWithAmount ? K : never;
  label: string;
  tokens: TokenWithAmount[];
  withGiftcard?: true;
  scale?: Scale;
};

export type SelectorProps = {
  token: TokenWithAmount;
  tokens: TokenWithAmount[];
  onChange(token: TokenWithAmount): void;
};

export type BalanceProps = {
  token: TokenWithAmount;
  onSetAmount: OnSetAmount;
  isGiftEnabled: boolean;
};

export type AmountOptionsProps = {
  token: TokenWithAmount;
  scale: Scale;
  onSetAmount: OnSetAmount;
};
