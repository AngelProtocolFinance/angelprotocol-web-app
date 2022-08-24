import { Dialog } from "@headlessui/react";
import { FC } from "react";
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
    <ChainGuard
      prompt={(node) => (
        <Dialog.Panel
          className={`w-full max-w-md min-h-[15rem] bg-white-grey rounded-md overflow-visible pt-4 fixed-center z-20`}
        >
          {node}
        </Dialog.Panel>
      )}
      requiredChain={requiredChain}
    >
      <TransactionPrompt inModal={inModal}>
        <Content {...contentProps} />
      </TransactionPrompt>
    </ChainGuard>
  );
}
