import { TxProps } from "components/Transactor";
import TransactionPrompt from "./TransactionPrompt";

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
