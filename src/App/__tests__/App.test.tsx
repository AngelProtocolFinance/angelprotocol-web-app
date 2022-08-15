import {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("Routing", async () => {
    render(<TestApp />);

    // const govText1 = /total staked/i;
    // const govText2 = /halo price/i;

    const marketText1 = /angel protocol supports/i;
    const marketText2 = /displaced ukrainians/i;

    const leaderboardText1 = /total donations/i;

    /** user starts at marketplace */
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    //view is not yet rendered and being lazy loaded
    expect(screen.queryByText(marketText1)).toBeNull();
    expect(screen.queryByText(marketText2)).toBeNull();

    //view is finally loaded,
    expect(await screen.findByText(marketText1)).toBeInTheDocument();
    expect(await screen.findByText(marketText2)).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();

    // NOTE: Governance will be reenabled when we relaunch the $HALO token
    //user goes to governance
    // const govLink = screen.getByText(/governance/i);
    // userEvent.click(govLink);

    // /** user is in governance */
    // const loader2 = screen.getByTestId("loader");
    // expect(loader2).toBeInTheDocument();

    // //view is not yet rendered and being lazy loaded
    // expect(screen.queryByText(govText1)).toBeNull();
    // expect(screen.queryByText(govText2)).toBeNull();

    // //view is finally loaded,
    // expect(await screen.findByText(govText1)).toBeInTheDocument();
    // expect(await screen.findByText(govText2)).toBeInTheDocument();
    // expect(loader2).not.toBeInTheDocument();

    //user goes to leaderboard
    const leaderboardLink = screen.getByText(/leaderboard/i);
    userEvent.click(leaderboardLink);

    /** user is in leaderboard */
    const loader3 = screen.getByTestId("loader");
    expect(loader3).toBeInTheDocument();

    //view is not yet rendered and being lazy loaded
    expect(screen.queryByText(leaderboardText1)).toBeNull();

    //view is finally loaded,
    expect(await screen.findByText(leaderboardText1)).toBeInTheDocument();
    expect(loader3).not.toBeInTheDocument();

    //user goes back to marketplace
    const marketPlaceLink = screen.getByText(/marketplace/i);
    userEvent.click(marketPlaceLink);

    /**user is back to marketplace */

    //view is loaded immediately since it's been loaded before
    expect(screen.getByText(marketText1)).toBeInTheDocument();
    expect(screen.getByText(marketText2)).toBeInTheDocument();
  });
});
