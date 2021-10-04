import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";

import { render, screen } from "@testing-library/react";
import { getContext } from "contexts/AuthProvider";
import { ReactNode } from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { app, site } from "types/routes";
import App from "./App";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

function Wrapper(props: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={[`${site.app}/${app.tca}`]} initialIndex={0}>
      <StaticWalletProvider defaultNetwork={testnet}>
        {props.children}
      </StaticWalletProvider>
    </MemoryRouter>
  );
}

describe("<App/> reacts to auth state", () => {
  window.scrollTo = jest.fn();

  test("App redirects to login when no token", () => {
    render(
      <Wrapper>
        <getContext.Provider value={null}>
          <Route path={site.app} component={App} />
        </getContext.Provider>
      </Wrapper>
    );

    const passWordInput = screen.getByPlaceholderText(/enter your password/i);
    expect(passWordInput).toBeInTheDocument();
  });

  test("App doesn't redirect when token is available", () => {
    render(
      <Wrapper>
        <getContext.Provider value={"testdecodedToken"}>
          <Route path={site.app} component={App} />
        </getContext.Provider>
      </Wrapper>
    );

    const amountInput = screen.getByLabelText(/amount/i);
    expect(amountInput).toBeInTheDocument();
  });
});
