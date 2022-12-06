import { StaticWalletProvider } from "@terra-money/wallet-provider";
import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { chainOptions } from "chainOptions";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-test-renderer";
import { DonationsMetricList, Update } from "types/aws";
import AppWrapper from "test/AppWrapper";
import { store } from "store/store";
import { appRoutes } from "constants/routes";
import App from "../App";

const mockMetrics: DonationsMetricList = {
  donations_daily_count: 0,
  donations_daily_amount: 0,
  donations_total_amount: 0,
};

jest.mock("services/aws/business_metrics", () => ({
  __esModule: true,
  useMetricsListQuery: () => ({
    data: mockMetrics,
  }),
}));

const mockUpdate: Update = { last_update: "", endowments: [] };
jest.mock("services/aws/leaderboard", () => ({
  __esModule: true,
  useLeaderboardsQuery: () => ({
    data: mockUpdate,
  }),
}));

describe("App.tsx tests", () => {
  const bannerText1 = /redefines/i;
  const loaderTestId = "loader";
  // const governanceLinkText = /governance/i;

  window.scrollTo = jest.fn();

  test("Routing", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <StaticWalletProvider {...chainOptions}>
            <App />
          </StaticWalletProvider>
        </Provider>
      </MemoryRouter>
    );
    // footer is immediately rendered
    // role here https://www.w3.org/TR/html-aria/#docconformance
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /marketplace/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /leaderboard/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /register/i,
      })
    ).toBeInTheDocument();

    //marketplace is being lazy loaded
    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
    //marketplace is finally loaded
    expect(await screen.findByText(bannerText1)).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();

    //user goes to leaderboards
    fireEvent.click(
      screen.getByRole("link", {
        name: /leaderboard/i,
      })
    );

    //leaderboard is being lazy loaded
    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
    //leaderboard is finally loaded
    expect(
      await screen.findByRole("heading", { name: /leaderboard/i })
    ).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();

    //user goes back to Marketplace
    fireEvent.click(
      screen.getByRole("link", {
        name: /marketplace/i,
      })
    );
    //marketplace is already lazy loaded on first visit
    expect(screen.getByText(bannerText1)).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();
  });
});
