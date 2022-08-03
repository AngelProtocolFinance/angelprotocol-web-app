import {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { render, screen, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import AppWrapper from "test/AppWrapper";
import { siteRoutes } from "constants/routes";
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
    <AppWrapper routes={[siteRoutes.index]} startingRouteIndex={0}>
      <Routes>
        <Route path={siteRoutes.index + "/*"} element={<App />} />
      </Routes>
    </AppWrapper>
  );
}

describe("User visits app", () => {
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

    //header is immediately rendered
    //role here https://www.w3.org/TR/html-aria/#docconformance
    await waitFor(() => {
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    //view is finally loaded,
    expect(await screen.findByText(text1)).toBeInTheDocument();
    expect(await screen.findByText(text2)).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
  });
});
