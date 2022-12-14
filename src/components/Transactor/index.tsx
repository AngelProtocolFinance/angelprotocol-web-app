import { FC } from "react";

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
    <></>
    // <TxPrompt inModal={inModal}>
    //   <Content {...contentProps} />
    // </TxPrompt>
  );
}
