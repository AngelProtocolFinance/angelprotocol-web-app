import {
  ConnectedWallet,
  Installation,
  NetworkInfo,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

// Enum extending @terra-money/wallet-types/types > ConnectType with Torus type
export enum ConnectType {
  /** Terra Station Extension or compatible browser extensions */
  EXTENSION = "EXTENSION",
  /** Terra Station Mobile or compatible mobile wallets */
  WALLETCONNECT = "WALLETCONNECT",
  /** Read only mode - View an address */
  READONLY = "READONLY",
  /** Torus wallet */
  TORUS = "TORUS",
}

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

export type WalletProxy = ConnectedWallet;
// export type WalletProxy = {
//   connections: Connection;
//   address: string;
//   network: NetworkInfo;
//   post: (tx: CreateTxOptions) => Promise<TxResult>;
// };

export const localterra: NetworkInfo = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};
