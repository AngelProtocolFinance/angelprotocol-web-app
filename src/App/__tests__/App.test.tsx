import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { DonationsMetricList, Update } from "types/aws";
import { describe, expect, test, vi } from "vitest";
import App from "../App";

const mockMetrics: DonationsMetricList = {
  donations_daily_count: 0,
  donations_daily_amount: 0,
  donations_total_amount_v2: 0,
};

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock("services/aws/business_metrics", () => ({
  __esModule: true,
  useMetricsListQuery: () => ({
    data: mockMetrics,
  }),
}));

const mockUpdate: Update = { last_update: "", endowments: [] };
vi.mock("services/aws/leaderboard", () => ({
  __esModule: true,
  useLeaderboardsQuery: () => ({
    data: mockUpdate,
  }),
}));

const heroText = /BETTER GIVING REDEFINES/i;
const marketLink = /marketplace/i;
const loginLink = /log in/i;
const signupLink = /sign up/i;
// const leadLink = /leaderboard/i;
const loaderTestId = "loader";

describe("App.tsx tests", () => {
  // const governanceLinkText = /governance/i;

  window.scrollTo = vi.fn() as any;

  test("Visit top level pages", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    // footer is immediately rendered
    // role here https://www.w3.org/TR/html-aria/#docconformance
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    expect(screen.getByTestId("nav_dropdown")).toBeInTheDocument();

    //marketplace is being lazy loaded
    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
    //marketplace is finally loaded
    expect(
      await screen.findByRole("heading", { name: heroText }, { timeout: 3000 })
    ).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();

    expect(
      await screen.findByRole("link", { name: loginLink })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: signupLink })
    ).toBeInTheDocument();

    //user goes to leaderboards
    // fireEvent.click(
    //   screen.getByRole("link", {
    //     name: leadLink,
    //   })
    // );
    // //leaderboard is being lazy loaded
    // expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
    // //leaderboard is finally loaded
    // expect(
    //   await screen.findByRole("heading", { name: leadLink })
    // ).toBeInTheDocument();
    // expect(screen.queryByTestId(loaderTestId)).toBeNull();

    //user goes back to leaderboard
    // fireEvent.click(
    //   screen.getByRole("link", {
    //     name: leadLink,
    //   })
    // );
    // //leaderboard is already lazy loaded on first visit
    // expect(screen.getByRole("heading", { name: leadLink })).toBeInTheDocument();
    // expect(screen.queryByTestId(loaderTestId)).toBeNull();

    //user goes back to Marketplace
    fireEvent.click(screen.getByTestId("nav_dropdown"));
    fireEvent.click(
      screen.getByRole("link", {
        name: marketLink,
      })
    );
    //marketplace is already lazy loaded on first visit
    expect(screen.getByRole("heading", { name: heroText })).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();
  });
});
