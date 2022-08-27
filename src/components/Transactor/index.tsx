import { Dialog } from "@headlessui/react";
import { FC, PropsWithChildren } from "react";
import ChainGuard from "contexts/ChainGuard";
import Icon from "components/Icon";
import Loader from "components/Loader";
import TransactionPrompt from "./TransactionPrompt";

export type TxProps<C> = {
  Content: FC<C>;
  contentProps: C;
  inModal?: false;
  requiredNetwork?: { id: string; name: string };
};

export default function Transactor<C>({
  Content,
  contentProps,
  inModal,
  requiredNetwork,
}: TxProps<C>) {
  return (
    <ChainGuard
      prompt={({ content }) => (
        <Dialog.Panel className="bg-zinc-50 fixed-center z-10 p-4 rounded-md w-full max-w-sm min-h-[10rem]">
          {content}
        </Dialog.Panel>
      )}
      requiredNetwork={requiredNetwork}
    >
      <TransactionPrompt inModal={inModal}>
        <Content {...contentProps} />
      </TransactionPrompt>
    </ChainGuard>
  );
}
