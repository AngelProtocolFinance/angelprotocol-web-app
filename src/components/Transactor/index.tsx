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
      prompt={(node, isLoading) => (
        <GuardPrompt showLoader={isLoading}>{node}</GuardPrompt>
      )}
      requiredChain={requiredChain}
    >
      <TransactionPrompt inModal={inModal}>
        <Content {...contentProps} />
      </TransactionPrompt>
    </ChainGuard>
  );
}

export function GuardPrompt(
  props: PropsWithChildren<{ showLoader?: boolean }>
) {
  return (
    <Dialog.Panel className="fixed-center z-20 grid content-center place-items-center bg-white-grey text-angel-grey min-h-[15rem] w-full max-w-sm p-4 rounded-md shadow-lg">
      {props.showLoader ? (
        <Loader
          gapClass="gap-2"
          bgColorClass="bg-angel-grey"
          widthClass="w-4"
        />
      ) : (
        <Icon type="Info" size={30} />
      )}
      <div className="mt-2">{props.children}</div>
    </Dialog.Panel>
  );
}
