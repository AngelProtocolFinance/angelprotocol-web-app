import {
  FC,
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
} from "react";
import { chains } from "constants/chainsV2";
import {
  ConnectedWallet,
  DisconnectedWallet,
  useWalletContext,
} from "./WalletContext";

type Classes = {
  container?: string;
  overlay?: string;
};

type Overlay = {
  type: "overlay";
  classes?: { container?: string; overlay: string };
};

type Replacement = {
  type: "replacement";
  classes?: never;
};

type UI<T extends object> = ReactElement | FC<T>;

type UIs = {
  loading: UI<any>;
  disconnected: UI<{ wallets: DisconnectedWallet[] }>;
  unsupported: UI<ConnectedWallet>;
};

type FallbackOptions = (Overlay | Replacement) & UIs;

export default function withConnectedWallet<T extends object>(
  Component: FC<T>,
  options: FallbackOptions
) {
  return function WalletGuard(props: T) {
    const wallet = useWalletContext();
    const {
      loading: Loader,
      disconnected: Connector,
      unsupported: Switcher,
    } = options;

    if (wallet === "loading") {
      const fallback = isElement(Loader) ? Loader : <Loader />;
      return options.type === "overlay" ? (
        <WithOverlay classes={options.classes} fallback={fallback}>
          <Component {...props} />
        </WithOverlay>
      ) : (
        fallback
      );
    }

    if (Array.isArray(wallet)) {
      const fallback = isElement(Connector) ? (
        Connector
      ) : (
        <Connector wallets={wallet} />
      );
      return options.type === "overlay" ? (
        <WithOverlay classes={options.classes} fallback={fallback}>
          <Component {...props} />
        </WithOverlay>
      ) : (
        fallback
      );
    }
    /** could also check here, chainId whitelist, blacklist. check if in general list for now */
    if (!(wallet.chainId in chains)) {
      const fallback = isElement(Switcher) ? (
        Switcher
      ) : (
        <Switcher {...wallet} />
      );
      return options.type === "overlay" ? (
        <WithOverlay classes={options.classes} fallback={fallback}>
          <Component {...props} />
        </WithOverlay>
      ) : (
        fallback
      );
    }

    return (
      <context.Provider value={wallet}>
        <Component {...props} />
      </context.Provider>
    );
  };
}

const typeKey: keyof ReactElement = "type";
function isElement(
  component: ReactElement | FC<any>
): component is ReactElement {
  return typeKey in component;
}

function WithOverlay({
  children,
  classes,
  fallback,
}: PropsWithChildren<{ classes?: Classes; fallback: JSX.Element }>) {
  const { container = "", overlay = "" } = classes || {};
  return (
    <context.Provider value={PLACEHOLDER_WALLET}>
      <div className={container + " relative"}>
        <div className={overlay + " absolute inset-0"}>{fallback}</div>
        {children}
      </div>
    </context.Provider>
  );
}

const UNINITIALIZED: any = "uninitialized";
const context = createContext<ConnectedWallet>(UNINITIALIZED);
export function useConnectedWallet() {
  const val = useContext(context);
  if (val === UNINITIALIZED)
    throw new Error(
      "this hook should only be used within components wrapped by withConnectedWallet"
    );

  return val;
}

export const PLACEHOLDER_WALLET: ConnectedWallet = {
  id: "keplr",
  type: "cosmos",
  name: "",
  logo: "",
  address: "",
  chainId: "",
  status: "connected",
  disconnect: () => {
    throw new Error("placeholder wallet shoudn't be used");
  },
  client: {} as any,
};
