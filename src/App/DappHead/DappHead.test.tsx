import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App/App";
import { Route, Routes } from "react-router-dom";
import AppWrapper from "test/AppWrapper";
import { appRoutes, siteRoutes } from "constants/routes";

/**
 * @jest-environment jsdom
 */
// define initial routes
const routes = [
  `${siteRoutes.app}`,
  `${siteRoutes.app}/${appRoutes.marketplace}`,
  // `${siteRoutes.app}/${appRoutes.govern}`,
  `${siteRoutes.app}/${appRoutes.leaderboard}`,
];

function TestApp() {
  return (
    <AppWrapper routes={routes} startingRouteIndex={0}>
      <Routes>
        <Route path={siteRoutes.app + "/*"} element={<App />} />
      </Routes>
    </AppWrapper>
  );
}

describe("DappHead test", () => {
  window.scrollTo = jest.fn();
  test("dapphead routing", async () => {
    render(<TestApp />);

    const govText1 = /total staked/i;
    const govText2 = /halo price/i;

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
