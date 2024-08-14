import coinbaseIcon from "assets/icons/wallets/coinbase.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import trustIcon from "assets/icons/wallets/trust.png";
import xdefiIcon from "assets/icons/wallets/xdefi.png";
import { EvmChainIds } from "constants/chains";
import isMobile from "is-mobile";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { ConnectedWallet, DisconnectedWallet, Wallet } from "types/wallet";
import type { WalletContextState } from "./types";
import useInjectedProvider from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";
import { useEVMWC, useKeplrWC } from "./wallet-connect";

export default function WalletContext(props: PropsWithChildren<{}>) {
  const metamask = useInjectedProvider(
    "metamask",
    {
      name: "Metamask",
      logo: metamaskIcon,
      supportedChains: EvmChainIds,
    },
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
  );

  const trust = useInjectedProvider(
    "trust-wallet",
    {
      name: "Trust wallet",
      logo: trustIcon,
      supportedChains: EvmChainIds,
    },
    "https://chromewebstore.google.com/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph?hl=en"
  );

  const coinbase = useInjectedProvider(
    "coinbase",
    {
      name: "Coinbase",
      logo: coinbaseIcon,
      supportedChains: EvmChainIds,
    },
    "https://chromewebstore.google.com/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en"
  );

  const xdefiEvm = useInjectedProvider(
    "xdefi-evm",
    { logo: xdefiIcon, name: "Xdefi", supportedChains: EvmChainIds },
    "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf?hl=en"
  );

  const { wc: stationMobile, extensions } = useTerra();
  const keplr = useKeplr();
  const keplrWC = useKeplrWC();
  const evmWC = useEVMWC({
    logo: metamaskIcon,
    name: "Metamask Mobile",
    supportedChains: EvmChainIds,
  });

  const wallets: Wallet[] = isMobile()
    ? [evmWC, keplrWC, stationMobile]
    : [
        keplr,
        metamask,
        evmWC,
        coinbase,
        keplrWC,
        trust,
        xdefiEvm,
        ...extensions,
        stationMobile,
      ];

  const connectedWallet = wallets.find((w) => w.status === "connected") as
    | ConnectedWallet
    | undefined;

  const isLoading = wallets.some((w) => w.status === "loading");

  return (
    <context.Provider
      value={
        isLoading
          ? "loading"
          : connectedWallet
            ? connectedWallet
            : (wallets as DisconnectedWallet[])
      }
    >
      {props.children}
    </context.Provider>
  );
}

const UNINITIALIZED = "unitialized";
const context = createContext<WalletContextState>(
  UNINITIALIZED as unknown as WalletContextState
);

export const useWalletContext = () => {
  const val = useContext(context);
  if ((val as any) === UNINITIALIZED) {
    throw new Error("this hook should only be used inside wallet context");
  }
  return val;
};
