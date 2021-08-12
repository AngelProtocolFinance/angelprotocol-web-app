import { ConnectType, WalletStatus } from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import TestWalletProvider from "test/helpers/TestWalletProvider";
import Header from ".";

describe("Without user", () => {
  test("Renders 'connect wallet'", () => {
    render(
      <TestWalletProvider>
        <Header
          // TODO (borodanov to cheng): fix hasMenu is missing
          hasMenu={true}
          wallet={undefined}
          onConnect={() => {}}
          onDisconnect={() => {}}
        />
      </TestWalletProvider>
    );

    const connectWalletEl = screen.getByText("Connect Chrome Extension");
    expect(connectWalletEl).toBeInTheDocument();
  });
});

describe("With user", () => {
  test("Renders wallet address", () => {
    render(
      <TestWalletProvider
        walletStatus={WalletStatus.WALLET_CONNECTED}
        walletInfo={{
          connectType: ConnectType.CHROME_EXTENSION,
          terraAddress: "123",
        }}
      >
        <Header
          // TODO (borodanov to cheng): fix hasMenu is missing
          hasMenu={true}
          wallet={{ terraAddress: "123" }}
          onConnect={() => {}}
          onDisconnect={() => {}}
        />
      </TestWalletProvider>
    );

    const walletAddressEl = screen.getByText("123...");
    expect(walletAddressEl).toBeInTheDocument();

    const disconnectWalletEl = screen.getByText("Disconnect");
    expect(disconnectWalletEl).toBeInTheDocument();
  });
});
