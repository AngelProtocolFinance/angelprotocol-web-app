import { Menu } from "@headlessui/react";
import {
  Fragment,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { Chain } from "types/server/aws";
import { useChainQuery } from "services/apes";
import { TextLoader } from "components/Loader";
import { TextInfo } from "components/TextInfo";
import { Connector } from "components/WalletSuite";
import { Wallet, WalletId, useWalletContext } from "./WalletContext";

type Loading = { id: "loading"; content: ReactNode; wallet?: never };
type Disconnected = { id: "disconnected"; content: ReactNode; wallet?: never };
type Unsupported = { id: "unsupported"; content: ReactNode; wallet?: never };
type Verified = { id: "verified"; content: ReactNode; wallet: ChainWallet };
type Status = Loading | Disconnected | Unsupported | Verified;
type Prompt = { (status: Status): ReactElement };

type Props = {
  prompt: Prompt;
  allowedWallets?: WalletId[];
  requiredNetwork?: { id: string; name: string };
  children?: ReactNode;
};

export default function ChainGuard({
  prompt,
  children,
  requiredNetwork,
  allowedWallets,
}: Props) {
  const {
    wallet,
    isLoading: isWalletLoading,
    connections,
    disconnect,
  } = useWalletContext();

  const {
    data: chain,
    isLoading: isFetchingChain,
    isError,
  } = useChainQuery(wallet!, { skip: !wallet });

  if (isWalletLoading) {
    return prompt({
      id: "loading",
      content: <TextLoader text="Wallet is loading.." />,
    });
  }

  if (!wallet) {
    return prompt({
      id: "disconnected",
      content: (
        <Menu as="div">
          <p className="uppercase font-bold font-heading text-zinc-600">
            Connect wallet
          </p>
          <Menu.Items static>
            {connections
              .filter((c) =>
                allowedWallets ? allowedWallets.includes(c.id) : true
              )
              .map((c) => (
                <Connector key={c.id} {...c} />
              ))}
          </Menu.Items>
        </Menu>
      ),
    });
  }

  if (allowedWallets && !allowedWallets.includes(wallet.id)) {
    return prompt({
      id: "unsupported",
      content: (
        <TextInfo title="Incompatible wallet">
          <p></p>
        </TextInfo>
      ),
    });
  }

  if (requiredNetwork && requiredNetwork.id !== wallet.chainId) {
    return prompt({
      id: "unsupported",
      content: (
        <p>
          Kindly switch wallet network to{" "}
          <span className="font-semibold">{requiredNetwork.name}</span>
        </p>
      ),
    });
  }
  if (isFetchingChain) {
    return prompt({
      id: "loading",
      content: <TextLoader text="Getting chain data..." />,
    });
  }

  if (!chain || isError) {
    return prompt({
      id: "unsupported",
      content: (
        <TextInfo title="Wallet network unsupported">
          <div>hello world</div>
        </TextInfo>
      ),
    });
  }

  if (!children) {
    return prompt({
      id: "verified",
      content: null,
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
