import { EVMChains } from "constants/chains";
import isMobile from "is-mobile";
import { PropsWithChildren, createContext, useContext } from "react";
import { ConnectedWallet, DisconnectedWallet, Wallet } from "types/wallet";
import { WalletContextState } from "./types";
import useInjectedProvider from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";
import { useEVMWC, useKeplrWC } from "./wallet-connect";

const binanceWalletIcon = "/icons/wallets/binance.png";
const metamaskIcon = "/icons/wallets/metamask.png";
const xdefiIcon = "/icons/wallets/xdefi.jpg";

export default function WalletContext(props: PropsWithChildren<{}>) {
  const metamask = useInjectedProvider(
    "metamask",
    {
      name: "Metamask",
      logo: metamaskIcon,
      supportedChains: EVMChains,
    },
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
  );

  const binance = useInjectedProvider(
    "binance-wallet",
    {
      name: "Binance wallet",
      logo: binanceWalletIcon,
      supportedChains: ["56", "97"],
    },
    "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp"
  );

  const xdefiEvm = useInjectedProvider(
    "xdefi-evm",
    { logo: xdefiIcon, name: "Xdefi", supportedChains: EVMChains },
    "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf?hl=en"
  );

  const { wc: stationMobile, extensions } = useTerra();
  const keplr = useKeplr();
  const keplrWC = useKeplrWC();
  const evmWC = useEVMWC({
    logo: metamaskIcon,
    name: "Metamask Mobile",
    supportedChains: EVMChains,
  });

  const wallets: Wallet[] = isMobile()
    ? [evmWC, keplrWC, stationMobile]
    : [
        keplr,
        metamask,
        evmWC,
        keplrWC,
        binance,
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
