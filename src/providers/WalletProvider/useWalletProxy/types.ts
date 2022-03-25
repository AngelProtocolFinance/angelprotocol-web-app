import {
  Connection,
  ConnectType,
  NetworkInfo,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { chainIDs } from "../../../constants/chainIDs";
import { denoms } from "../../../constants/currency";

export type Coin = {
  amount: number; // "1000"
  denom: denoms; //"denoms.uusd, denoms.uluna"
};

export type WalletProxy = {
  address: string;
  chainId: chainIDs;
  coins: Coin[];
  connection?: Connection;
  displayCoin: Coin;
  icon: string;
  id?: string;
  network?: NetworkInfo & { blockchain: Blockchain };
  status: WalletStatus;
  supported_denoms: denoms[];

  connect: (...args: any[]) => Promise<void>;
  disconnect: () => Promise<void>;
  post: (...args: any[]) => Promise<any>;
  sign: (...args: any[]) => Promise<any>;
};

export const DEFAULT_WALLET: WalletProxy = {
  address: "",
  chainId: chainIDs.gen_mainnet,
  coins: [],
  displayCoin: { amount: 0, denom: denoms.uluna },
  icon: "",
  status: WalletStatus.WALLET_NOT_CONNECTED,
  supported_denoms: [],

  connect: (..._: any[]) => new Promise((r) => r),
  disconnect: () => new Promise((r) => r),
  post: (..._: any[]) => new Promise((r) => r),
  sign: (..._: any[]) => new Promise((r) => r),
};

export enum Blockchain {
  none = "none",
  ethereum = "ethereum",
  terra = "terra",

  // phantom = "phantom",
  // keplr = "keplr",
}
