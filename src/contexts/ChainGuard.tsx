import { FC, ReactNode, createContext, useContext } from "react";
import { Chain } from "types/server/aws";
import { useChainQuery } from "services/apes";
import { Wallet, useWalletContext } from "./WalletContext";

export default function ChainGuard({
  requiredChain,
  Container,
  children,
}: {
  Container: FC;
  requiredChain?: { id: string; name: string };
  children: ReactNode;
}) {
  const { wallet, isLoading: isWalletLoading } = useWalletContext();
  const {
    data: chain,
    isLoading: isFetchingChain,
    isError,
  } = useChainQuery(wallet!, { skip: !wallet });

  if (isWalletLoading) {
    return <Container>Wallet is loading...</Container>;
  }

  if (!wallet) {
    return <Container>Wallet is disconnected</Container>;
  }

  if (requiredChain && wallet.chainId !== requiredChain.id) {
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
    <context.Provider value={{ ...chain, wallet }}>{children}</context.Provider>
  );
}

export type VerifiedChain = Chain & { wallet: Wallet };
const context = createContext({} as VerifiedChain);
export const useChain = () => {
  const val = useContext(context);
  if (Object.entries(val).length <= 0) {
    throw new Error("this hook should only be used inside Chain Guard");
  }
  return val;
};
