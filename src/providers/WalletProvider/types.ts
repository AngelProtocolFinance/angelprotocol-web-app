import { CreateTxOptions } from "@terra-money/terra.js";
import {
  ConnectType,
  Installation,
  NetworkInfo,
  TxResult,
  WalletStatus,
} from "@terra-money/wallet-provider";

// Enum extending @terra-money/wallet-types/types > ConnectType with Torus type
const ProxyConnectTypes = { ...ConnectType, TORUS: "TORUS" };

// Proxy Connection version of @terra-money/wallet-types/types > Connection
export type ConnectionProxy = {
  type: keyof typeof ProxyConnectTypes;
  identifier?: string;
  name: string;
  icon: string;
};

export type IWalletContext = {
  wallet?: WalletProxy;
  status: WalletStatus;
  availableWallets: WalletProxy[];
  availableInstallations: Installation[];
};

export type WalletProxy = {
  connection: ConnectionProxy;
  address: string;
  network: NetworkInfo;
  post: (txOptions: CreateTxOptions) => Promise<TxResult>;
  connect: (...args: any[]) => Promise<void>;
  disconnect: () => Promise<void>;
};
