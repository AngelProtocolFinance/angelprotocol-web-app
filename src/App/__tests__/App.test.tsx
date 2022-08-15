import {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { render, screen, waitFor } from "@testing-library/react";
import AppWrapper from "test/AppWrapper";
import App from "../App";

// define initial routes
const terra_testnet: NetworkInfo = {
  name: "testnet",
  chainID: "pisco-1",
  lcd: "https://pisco-lcd.terra.dev",
  walletconnectID: 0,
};

jest.mock("@terra-money/wallet-provider", () => {
  const originalModule = jest.requireActual("@terra-money/wallet-provider");
  return {
    __esModule: true,
    ...originalModule,
    getChainOptions: () =>
      Promise.resolve<WalletControllerChainOptions>({
        defaultNetwork: terra_testnet,
        walletConnectChainIds: [terra_testnet],
      }),
  };
});

function TestApp() {
  return (
    <AppWrapper>
      <App />
    </AppWrapper>
  );
}

describe("user visits app", () => {
  window.scrollTo = jest.fn();
  test("App's default page is lazy loaded Marketplace", async () => {
    render(<TestApp />);

    //loader is rendered because content is being lazy loaded
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    //view is not yet rendered and being lazy loaded
    const text1 = /angel protocol supports/i;
    const text2 = /displaced ukrainians/i;
    expect(screen.queryByText(text1)).toBeNull();
    expect(screen.queryByText(text2)).toBeNull();

    //footer is immediately rendered
    //role here https://www.w3.org/TR/html-aria/#docconformance
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    //view is finally loaded,
    //role here https://www.w3.org/TR/html-aria/#docconformance
    expect(await screen.findByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(text1)).toBeInTheDocument();
    expect(screen.getByText(text2)).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
  });
});
