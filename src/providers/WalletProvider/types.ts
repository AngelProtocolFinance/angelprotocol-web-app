import { CreateTxOptions } from "@terra-money/terra.js";
import {
  Installation,
  NetworkInfo,
  WalletStatus,
  ConnectType as ConnectTypeTerraJs,
  TxResult,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

// Enum extending @terra-money/wallet-types/types > ConnectType with Torus type
const ProxyConnectTypes = {
  ...ConnectTypeTerraJs,
  /** Torus wallet */
  TORUS: "TORUS",
};

export type ConnectType = keyof typeof ProxyConnectTypes;

// Local type version of @terra-money/wallet-types/types > Connection
export type Connection = {
  type: ConnectType;
  identifier?: string;
  name: string;
  icon: string;
};

export type IWalletContext = {
  wallet?: WalletProxy;
  status: WalletStatus;
  network: NetworkInfo;
  availableConnections: Connection[];
  availableInstallations: Installation[];
  connect: (...args: any[]) => void;
  disconnect: () => void;
};

export type WalletProxy = {
  connectType: ConnectType;
  connection: Connection;
  address: string;
  network: NetworkInfo;
  post: (txOptions: CreateTxOptions) => Promise<TxResult>;
};

export const DEFAULT_WALLET: WalletProxy = {
  address: "",
  network: {
    name: "testnet",
    chainID: chainIDs.testnet,
    lcd: terra_lcds[chainIDs.testnet],
  },
  connection: { type: "READONLY", name: "default", icon: "" },
  connectType: "READONLY",
  post: (_: CreateTxOptions) => new Promise((r) => r),
};

export const localterra: NetworkInfo = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};
