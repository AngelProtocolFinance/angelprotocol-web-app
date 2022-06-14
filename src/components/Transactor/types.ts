import { FC } from "react";

export type TxProps<C> = {
  Content: FC<C>;
  contentProps: C;
  inModal?: false;
};
