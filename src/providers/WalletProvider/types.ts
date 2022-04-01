import { CreateTxOptions } from "@terra-money/terra.js";
import {
  Installation,
  NetworkInfo,
  WalletStatus,
  ConnectType,
  TxResult,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

// Enum extending @terra-money/wallet-types/types > ConnectType with Torus type
const ProxyConnectTypes = { ...ConnectType, TORUS: "TORUS" };

// Proxy Connection version of @terra-money/wallet-types/types > Connection
export type Connection = {
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
  connection: Connection;
  address: string;
  network: NetworkInfo;
  post: (txOptions: CreateTxOptions) => Promise<TxResult>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export const localterra: NetworkInfo = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};
