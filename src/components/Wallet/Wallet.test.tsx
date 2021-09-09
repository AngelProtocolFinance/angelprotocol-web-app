import {
  ConnectType,
  NetworkInfo,
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import Wallet from "./Wallet";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

describe("Renders text according to wallet status", () => {
  test("wallet is initializing'", () => {
    render(
      <StaticWalletProvider defaultNetwork={testnet}>
        <Wallet />
      </StaticWalletProvider>
    );
    //only div loaders are present during initialization
    const connectButtonEl = screen.queryByRole("button");
    expect(connectButtonEl).toBeNull();
  });

  test("wallet is not connected'", () => {
    render(
      <StaticWalletProvider
        defaultNetwork={testnet}
        status={WalletStatus.WALLET_NOT_CONNECTED}
        availableConnectTypes={[ConnectType.CHROME_EXTENSION]}
      >
        <Wallet />
      </StaticWalletProvider>
    );
    const connectButtonEl = screen.getByRole("button");
    expect(connectButtonEl).toHaveTextContent(/connect/i);
  });

  test("wallet is not installed", () => {
    render(
      <StaticWalletProvider
        defaultNetwork={testnet}
        status={WalletStatus.WALLET_NOT_CONNECTED}
        availableInstallTypes={[ConnectType.CHROME_EXTENSION]}
      >
        <Wallet />
      </StaticWalletProvider>
    );
    const connectButtonEl = screen.getByRole("button");
    expect(connectButtonEl).toHaveTextContent(/install/i);
  });

  test("wallet is connected", () => {
    render(
      <StaticWalletProvider
        defaultNetwork={testnet}
        status={WalletStatus.WALLET_CONNECTED}
        availableConnectTypes={[ConnectType.CHROME_EXTENSION]}
      >
        <Wallet />
      </StaticWalletProvider>
    );

    screen.debug();

    const connectButtonEl = screen.getByRole("button");
    expect(connectButtonEl).toHaveTextContent(/disconnect/i);
  });
});
