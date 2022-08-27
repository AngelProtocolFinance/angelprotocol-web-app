import { ReactElement, ReactNode, createContext, useContext } from "react";
import { Chain } from "types/server/aws";
import { useChainQuery } from "services/apes";
import { Wallet, useWalletContext } from "./WalletContext";

type Props = {};
type Loading = { id: "loading"; message: string; wallet?: never };
type Disconnected = { id: "disconnected"; message: string; wallet?: never };
type Unsupported = { id: "unsupported"; message: string; wallet?: never };
type Verified = { id: "verified"; message: string; wallet: ChainWallet };
type State = Loading | Disconnected | Unsupported | Verified;
type Prompt = { (state: State): ReactElement };

export default function ChainGuard({
  requiredChain,
  prompt,
  children,
}: {
  requiredChain?: { id: string; name: string };
  children?: ReactNode;
  prompt: Prompt;
}) {
  const { wallet, isLoading: isWalletLoading } = useWalletContext();
  const {
    data: chain,
    isLoading: isFetchingChain,
    isError,
  } = useChainQuery(wallet!, { skip: !wallet });

  if (isWalletLoading) {
    return prompt({ id: "loading", message: "Wallet is loading.." });
  }

  if (!wallet) {
    return prompt({ id: "loading", message: "Wallet is disconnected" });
  }

  if (requiredChain && wallet.chainId !== requiredChain.id) {
    return prompt({
      id: "unsupported",
      message: `Kindly change network to ${
        requiredChain?.name || "required chain"
      }`,
    });
  }

  if (isFetchingChain) {
    return prompt({ id: "loading", message: "Getting chain data" });
  }

  if (!chain || isError) {
    return prompt({
      id: "unsupported",
      message: "We only support JUNO, ETHEREUM and BINANCE network",
    });
  }

  if (!children) {
    return prompt({
      id: "verified",
      message: "",
      wallet: { ...chain, ...wallet },
    });
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
