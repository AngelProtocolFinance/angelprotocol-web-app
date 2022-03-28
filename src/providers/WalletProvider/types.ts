import {
  ConnectedWallet,
  Connection,
  Installation,
  NetworkInfo,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

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
