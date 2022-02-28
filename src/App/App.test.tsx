import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter, Route } from "react-router-dom";
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
        <Route path={site.app} component={App} />
      </Wrapper>
    );

    // check for banner
    const giveOnce = "GIVE ONCE,";
    const giveForever = "GIVE FOREVER.";
    expect(screen.queryByText(giveOnce)).toBeInTheDocument();
    expect(screen.queryByText(giveForever)).toBeInTheDocument();
  });

  test("Routes to governance page", async () => {
    render(
      <Wrapper>
        <Route path={site.app} component={App} />
      </Wrapper>
    );
    const navigator = screen.getByText("Governance");
    expect(navigator).toBeInTheDocument();
    // click the NavLink item
    userEvent.click(navigator);

    // governance page is rendered
    expect(await screen.findByText("Governance")).toBeInTheDocument();
    expect(await screen.findByText("total staked")).toBeInTheDocument();
    expect(await screen.findByText("Trade Halo")).toBeInTheDocument();
  });
});
