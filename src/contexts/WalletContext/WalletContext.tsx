import { PropsWithChildren, createContext, useContext } from "react";
import { ConnectedWallet, ContextState, DisconnectedWallet } from "./types";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { IS_MOBILE, IS_TEST } from "constants/env";
import useInjectedProvider from "./useInjectedProvider";
import useKeplr from "./useKeplr/useKeplr";
import useTerra from "./useTerra";
import { useEVMWC, useKeplrWC } from "./wallet-connect";

// import { useEVMWC, useKeplrWC } from "./wallet-connect";

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
  const { extensions: terraExtensions, wc: terraWC } = useTerra();
  const keplr = useKeplr();
  const keplrWC = useKeplrWC();
  const evmWC = useEVMWC();

  const mobiles = [evmWC, terraWC, ...(IS_TEST ? [] : [keplrWC])];
  const extensions = [keplr, metamask, binance, xdefiEvm, ...terraExtensions];
  const wallets = [...extensions, ...mobiles];

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
          : ((IS_MOBILE ? mobiles : wallets) as DisconnectedWallet[])
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
