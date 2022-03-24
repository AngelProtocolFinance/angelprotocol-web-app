import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { testnet } from "./chains";
import { app, site } from "constants/routes";
import { Provider } from "react-redux";
import { store } from "store/store";
import userEvent from "@testing-library/user-event";

function Wrapper(props: { children: ReactNode }) {
  return (
    <MemoryRouter
      initialEntries={[`${site.app}/${app.index}`]}
      initialIndex={0}
    >
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
          <Route path={site.app + "/*"} element={<App />} />
        </Routes>
      </Wrapper>
    );

    expect(screen.queryByText(/ANGEL PROTOCOL SUPPORTS/)).toBeInTheDocument();
    expect(screen.queryByText(/DISPLACED UKRAINIANS/)).toBeInTheDocument();
    const navItem = await screen.findByText(/Marketplace/i);
    expect(navItem).toBeInTheDocument();
    expect(navItem.getAttribute("aria-current")).toBe("page");
  });
});

describe("<App /> routing works correctly", () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <Routes>
          <Route path={site.app + "/*"} element={<App />} />
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
