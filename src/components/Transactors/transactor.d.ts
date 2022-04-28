declare module "@types-component/transactor" {
  import { FC } from "react";
  type TxProps<C> = {
    Content: FC<C>;
    contentProps: C;
    inModal?: true;
  };
}
