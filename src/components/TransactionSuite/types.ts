import { FC, ReactNode } from "react";
import { Step } from "services/transaction/types";

export type Display = { [key in Step]?: ReactNode };
export type TxProps<C> = {
  Context: FC<C>;
  contextProps: C;
  inModal?: true;
};
