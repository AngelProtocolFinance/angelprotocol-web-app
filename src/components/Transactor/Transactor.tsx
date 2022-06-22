import { FC } from "react";
import TransactionPrompt from "./TransactionPrompt";

type TxProps<C> = {
  Content: FC<C>;
  contentProps: C;
  inModal?: false;
};
export default function Transactor<C>({
  Content,
  contentProps,
  inModal,
}: TxProps<C>) {
  return (
    <TransactionPrompt inModal={inModal}>
      <Content {...contentProps} />
    </TransactionPrompt>
  );
}
