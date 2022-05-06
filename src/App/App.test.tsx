import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { WalletProvider } from "providers";
import { testnet } from "providers/WalletProvider/chainOptions";
import { store } from "store/store";
import { app, site } from "constants/routes";
import App from "./App";

// define initial routes
const routes = [
  `${site.app}`,
  `${site.app}/${app.marketplace}`,
  `${site.app}/${app.govern}`,
  `${site.app}/${app.leaderboard}`,
];

function Wrapper(props: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={routes} initialIndex={0}>
      <Provider store={store}>
        <WalletProvider defaultNetwork={testnet}>
          {props.children}
        </WalletProvider>
      </Provider>
    </MemoryRouter>
  );
}

function MockApp() {
  return (
    <Wrapper>
      <Routes>
        <Route path={site.app + "/*"} element={<App />} />
      </Routes>
    </Wrapper>
  );
}

describe("<App/> renders correctly", () => {
  window.scrollTo = jest.fn();
  test("App renders marketplace as default route", async () => {
    render(<MockApp />);

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
  test("Routes to governance page", async () => {
    render(<MockApp />);
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
    render(<MockApp />);
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
