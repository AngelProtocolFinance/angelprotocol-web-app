import { Menu } from "@headlessui/react";
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Chain } from "types/server/aws";
import { useChainQuery } from "services/apes";
import { TextLoader } from "components/Loader";
import { TextWarning } from "components/TextWarning";
import { Connector } from "components/WalletSuite";
import { Wallet, WalletId, useWalletContext } from "./WalletContext";

type Loading = { id: "loading"; content: ReactNode; wallet?: never };
type Disconnected = { id: "disconnected"; content: ReactNode; wallet?: never };
type Unsupported = { id: "unsupported"; content: ReactNode; wallet?: never };
type Verified = { id: "verified"; content: ReactNode; wallet: ChainWallet };
type Status = Loading | Disconnected | Unsupported | Verified;
type Prompt = { (status: Status): ReactElement };

export type ChainGuardProps = {
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
}: ChainGuardProps) {
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

  const allowedConnections = useMemo(
    () =>
      allowedWallets
        ? connections.filter((c) => allowedWallets.includes(c.id))
        : connections,
    [connections, allowedWallets]
  );

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
            {allowedConnections.map((c) => (
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
        <TextWarning
          title="Incompatible wallet"
          classes={{ container: "grid" }}
        >
          <p className="text-zinc-600 mt-4">
            Connected wallet can't perform this transaction
          </p>
          <button
            onClick={disconnect}
            className="mt-4 text-amber-500 hover:text-amber-400 justify-self-end text-xs font-heading uppercase font-bold text-zinc-50"
          >
            change wallet
          </button>
        </TextWarning>
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
        <TextWarning title="Wallet network unsupported">
          <p className="text-zinc-600 mt-4">
            NOTE: Show link of supported networks
          </p>
        </TextWarning>
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
