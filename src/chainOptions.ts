import { WalletControllerChainOptions } from "@terra-money/wallet-provider";

export const chainOptions: WalletControllerChainOptions = {
  defaultNetwork: {
    name: "mainnet",
    chainID: "phoenix-1",
    lcd: "https://phoenix-lcd.terra.dev",
    api: "https://phoenix-api.terra.dev",
    walletconnectID: 1,
  },
  walletConnectChainIds: {
    "0": {
      name: "testnet",
      chainID: "pisco-1",
      lcd: "https://pisco-lcd.terra.dev",
      api: "https://pisco-api.terra.dev",
      walletconnectID: 0,
    },
    "1": {
      name: "mainnet",
      chainID: "phoenix-1",
      lcd: "https://phoenix-lcd.terra.dev",
      api: "https://phoenix-api.terra.dev",
      walletconnectID: 1,
    },
    "2": {
      name: "classic",
      chainID: "columbus-5",
      lcd: "https://columbus-lcd.terra.dev",
      api: "https://columbus-api.terra.dev",
      mantle: "https://columbus-mantle.terra.dev",
      walletconnectID: 2,
    },
  },
};
