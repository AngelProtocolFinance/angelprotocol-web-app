import { FC, PropsWithChildren, createContext, useContext } from "react";
import { Chain } from "types/server/aws";
import { useChainQuery } from "services/apes";
import { WalletInfo, useWalletContext } from "contexts/Wallet";
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
  const { info, isLoading: isWalletLoading } = useWalletContext();
  const {
    data: chain,
    isLoading: isFetchingChain,
    isError,
  } = useChainQuery(info!, { skip: !info });

  if (isWalletLoading) {
    return <Container>Wallet is loading...</Container>;
  }

  if (!info) {
    return <Container>Wallet is disconnected</Container>;
  }

  if (requiredChain && info.chainId !== requiredChain.id) {
    return (
      <Container>
        Kindly change network to {requiredChain?.name || "required chain"}
      </Container>
    );
  }

  if (isFetchingChain) {
    return <Container>Getting form resources</Container>; //show skeleton?
  }

  if (!chain || isError) {
    return (
      <Container>Unsupported chain we only support these chains::</Container>
    );
  }

  return (
    <TransactionPrompt inModal={inModal}>
      <Content {...contentProps} />
    </TransactionPrompt>
  );
}

export type VerifiedChain = Chain & WalletInfo;
const context = createContext({} as VerifiedChain);
const useChain = () => {
  const val = useContext(context);
  if (Object.entries(val).length <= 0) {
    throw new Error("this hook should only be used inside Transactor Context");
  }
  return val;
};

function Container(props: PropsWithChildren<{}>) {
  return (
    <div
      className={`w-full max-w-md bg-white-grey rounded-md overflow-visible pt-4 fixed-center z-20`}
    >
      {props.children}
    </div>
  );
}
