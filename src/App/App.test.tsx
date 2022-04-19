import {
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { chainIDs } from "types/chainIDs";
import { appRoutes, siteRoutes } from "types/routes";
import Governance from "pages/Governance/Governance";
import Leaderboard from "pages/Leaderboard/Leaderboard";
import Market from "pages/Market/Market";
import { store } from "store/store";
import { terra_lcds } from "constants/urls";
import App from "./App";

const testnet = {
  name: "bombay",
  chainID: chainIDs.testnet,
  lcd: terra_lcds[chainIDs.testnet],
};

// define initial routes
const routes = [
  `${siteRoutes.app}`,
  `${siteRoutes.app}/${appRoutes.marketplace}`,
  `${siteRoutes.app}/${appRoutes.govern}`,
  `${siteRoutes.app}/${appRoutes.leaderboard}`,
];

function Wrapper(props: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={routes} initialIndex={0}>
      <Provider store={store}>
        <StaticWalletProvider
          defaultNetwork={testnet}
          status={WalletStatus.WALLET_CONNECTED}
        >
          {props.children}
        </StaticWalletProvider>
      </Provider>
    </MemoryRouter>
  );
}

describe("<App/> renders correctly", () => {
  window.scrollTo = jest.fn();
  test("App renders marketplace as default route", async () => {
    render(
      <Wrapper>
        <Routes>
          <Route path={siteRoutes.app} element={<App />}>
            <Route path={appRoutes.marketplace} element={<Market />} />
          </Route>
        </Routes>
      </Wrapper>
    );

    // check for ukrain banner
    const support = "ANGEL PROTOCOL SUPPORTS";
    const ukraine = "DISPLACED UKRAINIANS.";
    expect(await screen.findByText(support)).toBeInTheDocument();
    expect(await screen.findByText(ukraine)).toBeInTheDocument();
    const navItem = await screen.findByText(/Marketplace/i);
    expect(navItem).toBeInTheDocument();
    expect(navItem.getAttribute("aria-current")).toBe("page");
  });
});

describe("<App /> routes to Gov and Leaderboard pages", () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <Routes>
          <Route path={siteRoutes.app} element={<App />}>
            <Route path={appRoutes.marketplace} element={<Market />} />
            <Route path={appRoutes.govern} element={<Governance />} />
            <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
          </Route>
        </Routes>
      </Wrapper>
    );
  });

  test("Routes to governance page", async () => {
    const navigator = screen.getByText("Governance");
    expect(navigator).toBeInTheDocument();
    // click the NavLink item
    userEvent.click(navigator);

    // governance page is rendered
    const navItem = await screen.findByText(/Governance/i);
    expect(navItem).toBeInTheDocument();
    expect(navItem).toHaveAttribute("aria-current");
    expect(await screen.findByText("total staked")).toBeInTheDocument();
    expect(await screen.findByText("Trade Halo")).toBeInTheDocument();
  });

  test("Routes to Leaderboard page", async () => {
    const navigator = screen.getByText("Leaderboard");
    expect(navigator).toBeInTheDocument();
    // click the NavLink item
    userEvent.click(navigator);

    // Leaderboard page is rendered
    const navItem = await screen.findByText(/Leaderboard/i);
    expect(navItem).toBeInTheDocument();
    expect(navItem).toHaveAttribute("aria-current");
  });
});
