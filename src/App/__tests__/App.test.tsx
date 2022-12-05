import { fireEvent, render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { DonationsMetricList, Update } from "types/aws";
import Loader from "components/Loader";
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

function renderAppOnRoute(initialRoute = "/") {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Provider store={store}>
        <Suspense
          fallback={
            <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
          }
        >
          <App />
        </Suspense>
      </Provider>
    </MemoryRouter>
  );
}

describe("App.tsx tests", () => {
  const bannerText1 = /redefines/i;
  const loaderTestId = "loader";
  // const governanceLinkText = /governance/i;

  window.scrollTo = jest.fn();

  describe("Routing", () => {
    test("Initial page loads", async () => {
      renderAppOnRoute();

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
      expect(await screen.findByText(bannerText1)).toBeInTheDocument();
      expect(screen.queryByTestId(loaderTestId)).toBeNull();
    });

    test("to Leaderboard", async () => {
      renderAppOnRoute();

      expect(
        await screen.findByRole("link", { name: /leaderboard/i })
      ).toBeInTheDocument();

      //user goes to leaderboards
      fireEvent.click(
        screen.getByRole("link", {
          name: /leaderboard/i,
        })
      );
      expect(
        await screen.findByRole("heading", { name: /leaderboard/i })
      ).toBeInTheDocument();
      expect(screen.queryByTestId(loaderTestId)).toBeNull();
    });

    test("to Marketplace", async () => {
      renderAppOnRoute(appRoutes.leaderboard);

      expect(
        await screen.findByRole("link", { name: /marketplace/i })
      ).toBeInTheDocument();

      //user goes back to Marketplace
      fireEvent.click(
        screen.getByRole("link", {
          name: /marketplace/i,
        })
      );
      expect(await screen.findByText(bannerText1)).toBeInTheDocument();
      expect(screen.queryByTestId(loaderTestId)).toBeNull();
    });
  });
});
