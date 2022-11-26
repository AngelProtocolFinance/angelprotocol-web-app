import {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { placeholderCharity as mockPlaceholderCharity } from "services/aws/registration";
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

jest.mock("services/aws/registration", () => ({
  __esModule: true,
  useRegistrationLazyQuery: () => [() => {}],
  useRegistrationQuery: () => ({ charity: mockPlaceholderCharity }),
}));

describe("App.tsx tests", () => {
  const marketText1 = /angel protocol redefines/i;
  const marketText2 = /global impact financing/i;
  // const governanceLinkText = /governance/i;

  window.scrollTo = jest.fn();

  test("Routing", async () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );

    // loader is rendered because content is being lazy loaded
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    // view is not yet rendered and being lazy loaded
    expect(screen.queryByText(marketText1)).toBeNull();
    expect(screen.queryByText(marketText2)).toBeNull();

    // footer is immediately rendered
    // role here https://www.w3.org/TR/html-aria/#docconformance
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // view is finally loaded,
    // role here https://www.w3.org/TR/html-aria/#docconformance
    expect(await screen.findByRole("banner")).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();

    const marketplaceLink = await screen.findByRole("link", {
      name: /marketplace/i,
    });
    const leaderboardLink = await screen.findByRole("link", {
      name: /leaderboard/i,
    });

    const registerLink = await screen.findByRole("link", {
      name: /register/i,
    });

    //view is finally loaded
    expect(await screen.findByText(marketText1)).toBeInTheDocument();
    expect(await screen.findByText(marketText2)).toBeInTheDocument();
    expect(marketplaceLink).toBeInTheDocument();
    expect(leaderboardLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();

    //user goes to Leaderboard
    userEvent.click(leaderboardLink);
    expect(await screen.findByTestId("loader")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /leaderboard/i })
    ).toBeInTheDocument();

    //user goes to Registration
    userEvent.click(registerLink);
    expect(await screen.findByTestId("loader")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /start/i })
    ).toBeInTheDocument();

    //user goes to back to Leaderboard
    userEvent.click(leaderboardLink);
    expect(
      await screen.findByRole("heading", { name: /leaderboard/i })
    ).toBeInTheDocument();

    //user goes back to Marketplace
    userEvent.click(marketplaceLink);
    expect(await screen.findByText(marketText1)).toBeInTheDocument();
    expect(await screen.findByText(marketText2)).toBeInTheDocument();
  });
});
