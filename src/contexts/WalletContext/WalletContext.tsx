import isMobile from "is-mobile";
import { PropsWithChildren, createContext, useContext } from "react";
import {
  ConnectedWallet,
  ContextState,
  DisconnectedWallet,
  Wallet,
} from "./types-v2";
import { IS_MOBILE } from "constants/env";
import useInjectedProvider from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";
import useWeb3Auth from "./useWeb3Auth";
import { useEVMWC, useKeplrWC } from "./wallet-connect";

const binanceWalletIcon = "/icons/wallets/binance.png";
const metamaskIcon = "/icons/wallets/metamask.png";
const xdefiIcon = "/icons/wallets/xdefi.jpg";

export default function WalletContext(props: PropsWithChildren<{}>) {
  const metamask = useInjectedProvider({
    id: "metamask",
    logo: metamaskIcon,
    name: "Metamask",
    installUrl:
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
  });
  const binance = useInjectedProvider({
    id: "binance-wallet",
    logo: binanceWalletIcon,
    name: "Binance wallet",
    installUrl:
      "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp",
  });
  const xdefiEvm = useInjectedProvider({
    id: "xdefi-evm",
    logo: xdefiIcon,
    name: "Xdefi ethereum",
    installUrl:
      "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf?hl=en",
  });
  const { station, stationMobile, xdefiTerra, leap } = useTerra();
  const keplr = useKeplr();
  const web3Auth = useWeb3Auth();
  const keplrWC = useKeplrWC();
  const evmWC = useEVMWC({
    type: "evm",
    id: "metamask",
    logo: metamaskIcon,
    name: "Metamask Mobile",
  });

  const wallets: Wallet[] = isMobile()
    ? [web3Auth, evmWC, keplrWC, stationMobile]
    : //prettier-ignore
      [web3Auth,keplr,metamask,evmWC,keplrWC,binance,xdefiEvm,xdefiTerra,leap,station, stationMobile];

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
          : ((IS_MOBILE
              ? [web3Auth, evmWC, keplrWC, stationMobile]
              : wallets) as DisconnectedWallet[])
      }
    >
      {props.children}
    </context.Provider>
  );
}

const UNINITIALIZED = "unitialized";
const context = createContext<ContextState>(
  UNINITIALIZED as unknown as ContextState
);

export const useWalletContext = () => {
  const val = useContext(context);
  if ((val as any) === UNINITIALIZED) {
    throw new Error("this hook should only be used inside wallet context");
  }
  return val;
};
