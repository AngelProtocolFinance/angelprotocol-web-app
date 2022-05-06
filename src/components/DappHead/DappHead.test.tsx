import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App/App";
import { Route, Routes } from "react-router-dom";
import AppWrapper from "test/AppWrapper";
import { app, site } from "constants/routes";

/**
 * @jest-environment jsdom
 */

// define initial routes
const routes = [
  `${site.app}`,
  `${site.app}/${app.marketplace}`,
  `${site.app}/${app.govern}`,
  `${site.app}/${app.leaderboard}`,
];

function TestApp() {
  return (
    <AppWrapper routes={routes} startingRouteIndex={0}>
      <Routes>
        <Route path={site.app + "/*"} element={<App />} />
      </Routes>
    </AppWrapper>
  );
}

describe("DappHead test", () => {
  window.scrollTo = jest.fn();
  test("dapphead routing", async () => {
    render(<TestApp />);

    //get links
    const leaderboardLink = screen.getByText(/leaderboard/i);
    const marketPlaceLink = screen.getByText(/marketplace/i);
    const govLink = screen.getByText(/governance/i);

    //marketplace --> governance
    userEvent.click(govLink);
    //page is lazy loaded, test details in `pages/Governance.test.tsx`
    expect(await screen.findByText(/total staked/i)).toBeInTheDocument();
    expect(await screen.findByText(/halo price/i)).toBeInTheDocument();

    //governance --> leaderboard
    userEvent.click(leaderboardLink);
    //page is lazy loaded, test details in `pages/Leaderboard.test.tsx`
    expect(await screen.findByText(/total donations/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/daily donations total/i)
    ).toBeInTheDocument();

    //leaderboard --> marketplace
    userEvent.click(marketPlaceLink);
    //page is lazy loaded, test details in `pages/Market.test.tsx`
    expect(
      await screen.findByText(/angel protocol supports/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/displaced ukrainians/i)
    ).toBeInTheDocument();
  });
});
