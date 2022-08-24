import { Dialog } from "@headlessui/react";
import { FC, PropsWithChildren } from "react";
import ChainGuard from "contexts/ChainGuard";
import TransactionPrompt from "./TransactionPrompt";

export type TxProps<C> = {
  Content: FC<C>;
  contentProps: C;
  inModal?: false;
  requiredChain?: { id: string; name: string };
};

export default function Transactor<C>({
  Content,
  contentProps,
  inModal,
  requiredChain,
}: TxProps<C>) {
  return (
    <ChainGuard Container={Container} requiredChain={requiredChain}>
      <TransactionPrompt inModal={inModal}>
        <Content {...contentProps} />
      </TransactionPrompt>
    </ChainGuard>
  );
}

function Container(props: PropsWithChildren<{}>) {
  return (
    <Dialog.Panel
      className={`w-full max-w-md bg-white-grey rounded-md overflow-visible pt-4 fixed-center z-20`}
    >
      {props.children}
    </Dialog.Panel>
  );
}
