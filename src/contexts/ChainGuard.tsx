import { ReactElement, ReactNode, createContext, useContext } from "react";
import { Chain } from "types/server/aws";
import { useChainQuery } from "services/apes";
import { Wallet, useWalletContext } from "./WalletContext";

export default function ChainGuard({
  requiredChain,
  prompt,
  children,
}: {
  requiredChain?: { id: string; name: string };
  children: ReactNode;
  prompt: (node: ReactNode, isLoading?: boolean) => ReactElement;
}) {
  const { wallet, isLoading: isWalletLoading } = useWalletContext();
  const {
    data: chain,
    isLoading: isFetchingChain,
    isError,
  } = useChainQuery(wallet!, { skip: !wallet });

  if (isWalletLoading) {
    return prompt("Wallet is loading...", true);
  }

  if (!wallet) {
    return prompt("Wallet is disconnected");
  }

  if (requiredChain && wallet.chainId !== requiredChain.id) {
    return prompt(
      `Kindly change network to ${requiredChain?.name || "required chain"}`
    );
  }

  if (isFetchingChain) {
    return prompt("Fetching chain resources..", true);
  }

  if (!chain || isError) {
    return prompt("Unsupported chain we only support these chains");
  }

  return (
    <context.Provider value={{ ...chain, ...wallet }}>
      {children}
    </context.Provider>
  );
}

/**NOTE: ChainWallet is both subset of Chain and Wallet
 * const chainWallet:ChainWallet;
 * cosnt wallet:Wallet = chainWallet - no prob
 * const chain:Chain = chainWallet - no prob
 */
export type ChainWallet = Chain & Wallet;
const context = createContext({} as ChainWallet);
export const useChainWallet = () => {
  const val = useContext(context);
  if (Object.entries(val).length <= 0) {
    throw new Error("this hook should only be used inside Chain Guard");
  }
  return val;
};
