import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DonationsMetricList, Update } from "types/aws";
import { CategorizedEndowments, EndowmentEntry } from "types/contracts";
import AppWrapper from "test/AppWrapper";
import App from "../App";

const mockEndowment: EndowmentEntry = {
  categories: { sdgs: [], general: [] },
  endow_type: "Charity",
  id: 1,
  image: "",
  logo: "",
  name: "mock endowment",
  owner: "",
  status: "Approved",
  tier: "Level2",
};
const mockEndowments: Pick<CategorizedEndowments, 1> = {
  1: [mockEndowment],
};

jest.mock("services/juno/account", () => ({
  __esModule: true,
  useCategorizedEndowmentsQuery: () => ({
    data: mockEndowments,
  }),
}));

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
  // const governanceLinkText = /governance/i;

  window.scrollTo = jest.fn();

  test("Routing", async () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
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
    expect(screen.getByText(bannerText1)).toBeInTheDocument();
    expect(screen.getByText(bannerText2)).toBeInTheDocument();

    // marketplace is being lazy loaded
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    //marketplace is finally loaded
    expect(await screen.findByText(/mock endowment/i));
    expect(screen.queryByTestId("loader")).toBeNull();

    //user goes to leaderboards
    userEvent.click(
      screen.getByRole("link", {
        name: /leaderboard/i,
      })
    );
    expect(
      await screen.findByRole("heading", { name: /leaderboard/i })
    ).toBeInTheDocument();

    //user goes back to Marketplace
    userEvent.click(
      screen.getByRole("link", {
        name: /marketplace/i,
      })
    );
    expect(await screen.findByText(/mock endowment/i));
  });
});
