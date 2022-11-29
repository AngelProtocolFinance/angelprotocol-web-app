export type WalletInfo = { address: string; chainId: string };
type Loading = { status: "loading" };

type Connected = {
  status: "connected";
  disconnect(): void;
} & WalletInfo;

type Disconnected = { status: "disconnected"; connect(): void };

export type WalletState = Loading | Connected | Disconnected;
