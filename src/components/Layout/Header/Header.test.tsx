import { render, screen } from "@testing-library/react";
import Header from ".";

describe("Without user", () => {
  test("Renders 'connect wallet'", () => {
    render(
      <Header wallet={undefined} onConnect={() => {}} onDisconnect={() => {}} />
    );

    const connectWalletEl = screen.getByText("Connect Wallet");

    expect(connectWalletEl).toBeInTheDocument();
  });
});

describe("With user", () => {
  test("Renders wallet address", () => {
    render(
      <Header
        wallet={{ terraAddress: "123" }}
        onConnect={() => {}}
        onDisconnect={() => {}}
      />
    );

    const walletAddressEl = screen.getByText("123");
    expect(walletAddressEl).toBeInTheDocument();

    const disconnectWalletEl = screen.getByText("Disconnect Wallet");
    expect(disconnectWalletEl).toBeInTheDocument();
  });
});
