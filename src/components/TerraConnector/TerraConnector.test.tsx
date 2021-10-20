import {
  ConnectType,
  NetworkInfo,
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
        <MemoryRouter>
          <TerraConnector />
        </MemoryRouter>
      </StaticWalletProvider>
    );
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
        <MemoryRouter>
          <TerraConnector />
        </MemoryRouter>
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
        <MemoryRouter>
          <TerraConnector />
        </MemoryRouter>
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
        wallets={[
          {
            connectType: ConnectType.CHROME_EXTENSION,
            terraAddress: "terra1235",
          },
        ]}
      >
        <MemoryRouter>
          <TerraConnector />
        </MemoryRouter>
      </StaticWalletProvider>
    );
    expect(screen.getByRole("heading")).toHaveTextContent(/terra1235/i);
  });
});
