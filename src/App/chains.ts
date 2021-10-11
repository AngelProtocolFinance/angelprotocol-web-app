import { NetworkInfo } from "@terra-money/wallet-provider";

export const mainnet: NetworkInfo = {
  name: "mainnet",
  chainID: "columbus-5",
  lcd: "https://lcd.terra.dev",
};
export const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "bombay-12",
  lcd: "https://bombay-lcd.terra.dev",
};

export const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: testnet,
  1: mainnet,
};
