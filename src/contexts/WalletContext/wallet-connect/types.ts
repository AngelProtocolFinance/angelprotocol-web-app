import { ProviderId } from "types/lists";

export type WalletMeta = { logo: string; name: string; providerId: ProviderId };
type Loading = { status: "loading" };

export type Connected = {
  status: "connected";
  address: string;
  chainId: string;
};
type Disconnected = { status: "disconnected" };
export type WalletState = Loading | Connected | Disconnected;
