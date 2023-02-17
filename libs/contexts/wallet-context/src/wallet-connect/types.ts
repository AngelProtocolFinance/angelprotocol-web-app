import { ProviderId } from "../types";

export type WalletMeta = { logo: string; name: string; providerId: ProviderId };
type Loading = { status: "loading" };

export type Connected = {
  status: "connected";
  address: string;
  chainId: string;
  disconnect(): void;
};
type Disconnected = { status: "disconnected"; connect(): void };
export type WalletState = Loading | Connected | Disconnected;
