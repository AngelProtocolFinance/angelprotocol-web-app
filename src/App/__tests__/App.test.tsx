import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DonationsMetricList, Update } from "types/aws";
import { store } from "store/store";
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
  const bannerText1 = /angel protocol redefines/i;
  const bannerText2 = /global impact financing/i;
  const loaderTestId = "loader";
  // const governanceLinkText = /governance/i;

  window.scrollTo = jest.fn();

  test("Routing", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
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

    // marketplace is being lazy loaded
    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();

    //marketplace is finally loaded
    expect(
      await screen.findByRole("heading", { name: bannerText1 })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: bannerText2 })
    ).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();

    //user goes to leaderboards
    userEvent.click(
      screen.getByRole("link", {
        name: /leaderboard/i,
      })
    );
    expect(
      await screen.findByRole("heading", { name: /leaderboard/i })
    ).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();

    //user goes back to Marketplace
    userEvent.click(
      screen.getByRole("link", {
        name: /marketplace/i,
      })
    );
    expect(
      await screen.findByRole("heading", { name: bannerText1 })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: bannerText2 })
    ).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();
  });
});
