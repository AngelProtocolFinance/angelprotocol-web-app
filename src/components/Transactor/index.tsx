import { Dialog } from "@headlessui/react";
import { FC } from "react";
import ChainGuard, { ChainGuardProps } from "contexts/ChainGuard";
import TransactionPrompt from "./TransactionPrompt";

export type TxProps<C> = {
  Content: FC<C>;
  contentProps: C;
  inModal?: false;
} & Pick<ChainGuardProps, "allowedWallets" | "requiredNetwork">;

export default function Transactor<C>({
  Content,
  contentProps,
  inModal,
  ...chainGuardProps
}: TxProps<C>) {
  return (
    <ChainGuard
      {...chainGuardProps}
      prompt={({ content }) => (
        <Dialog.Panel className="bg-zinc-50 fixed-center z-10 p-4 rounded-md w-full max-w-sm min-h-[10rem]">
          {content}
        </Dialog.Panel>
      )}
    >
      <TransactionPrompt inModal={inModal}>
        <Content {...contentProps} />
      </TransactionPrompt>
    </ChainGuard>
  );
}
