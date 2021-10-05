import { NetworkInfo } from "@terra-dev/wallet-types";

const localterra = {
  name: "localterra",
  chainID: "localterra",
  lcd: "http://localhost:1317",
};

export const testnet = {
  name: "testnet",
  chainID: "tequilla-004",
  lcd: "https://tequilla-lcd.terra.dev",
};

const mainnet = {
  name: "mainnet",
  chainID: "columbus-4",
  lcd: "https://lcd.terra.dev",
};

const bombay = {
  name: "bombay",
  chainID: "bombay-12",
  lcd: "https://bombay-lcd.terra.dev",
};

export const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: localterra,
  1: testnet,
  2: mainnet,
  3: bombay,
};
