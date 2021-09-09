import {
  ConnectType,
  NetworkInfo,
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import TerraConnector from "./TerraConnector";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};
describe("Renders text according to wallet status", () => {
  test("wallet is initializing'", () => {
    render(
      <StaticWalletProvider defaultNetwork={testnet}>
        <TerraConnector />
      </StaticWalletProvider>
    );
    screen.debug();
    const connectButtonEl = screen.getByRole("button");
    expect(connectButtonEl).toHaveTextContent(/initializing/i);
  });

  test("wallet is not connected'", () => {
    render(
      <StaticWalletProvider
        defaultNetwork={testnet}
        status={WalletStatus.WALLET_NOT_CONNECTED}
        availableConnectTypes={[ConnectType.CHROME_EXTENSION]}
      >
        <TerraConnector />
      </StaticWalletProvider>
    );
    screen.debug();
    const connectButtonEl = screen.getByRole("button");
    expect(connectButtonEl).toHaveTextContent(/connect chrome extension/i);
  });

  test("wallet is not installed", () => {
    render(
      <StaticWalletProvider
        defaultNetwork={testnet}
        status={WalletStatus.WALLET_NOT_CONNECTED}
        availableInstallTypes={[ConnectType.CHROME_EXTENSION]}
      >
        <TerraConnector />
      </StaticWalletProvider>
    );
    screen.debug();
    const connectButtonEl = screen.getByRole("button");
    expect(connectButtonEl).toHaveTextContent(/install/i);
  });

  test("wallet is connected", () => {
    render(
      <StaticWalletProvider
        defaultNetwork={testnet}
        status={WalletStatus.WALLET_CONNECTED}
        wallets={[
          {
            connectType: ConnectType.CHROME_EXTENSION,
            terraAddress: "terra1235",
          },
        ]}
      >
        <TerraConnector />
      </StaticWalletProvider>
    );
    screen.debug();
    const connectButtonEl = screen.getByText(/terra1235/i);
    expect(connectButtonEl).toBeInTheDocument();
  });
});
