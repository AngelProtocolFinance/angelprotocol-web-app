import type { FieldValues, Path, PathValue } from "react-hook-form";
import type { ChainID } from "types/chain";
import type { TokenOption } from "types/tx";

type Classes = {
  container?: string;
  label?: string;
  inputContainer?: string;
};

export type Props<T extends FieldValues, K extends Path<T>> = {
  name: PathValue<T, K> extends TokenOption ? K : never;
  label: string;
  selectedChainId: ChainID;
  classes?: Classes;
  disabled?: boolean;

  withBalance?: true;
  withMininum?: true;
};

export type SelectorProps = {
  selectedChainId: ChainID;
  selectedToken: TokenOption;
  onChange(token: TokenOption): void;
};
