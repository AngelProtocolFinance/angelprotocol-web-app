import { FC } from "react";
import TransactionPrompt from "./TransactionPrompt";

export type TxProps<C extends object> = {
  Content: FC<C>;
  contentProps: C;
  inModal?: boolean;
};

export default function Transactor<C extends object>({
  Content,
  contentProps,
  inModal = true,
}: TxProps<C>) {
  return (
    <TransactionPrompt inModal={inModal}>
      <Content {...contentProps} />
    </TransactionPrompt>
  );
}
