import { ReactNode } from "react";
import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

type WrapProps = {
  children: ReactNode;
  initialEntries: string[];
};

const Wrapper = ({ children, initialEntries }: WrapProps) => (
  <MemoryRouter initialEntries={initialEntries}>
    <StaticWalletProvider defaultNetwork={testnet}>
      {children};
    </StaticWalletProvider>
  </MemoryRouter>
);

describe("Header renders nav depending on route", () => {
  test("header shows connect button when not in /login route", () => {
    render(
      <Wrapper initialEntries={["/"]}>
        <Header />;
      </Wrapper>
    );

    const terraConnectorEl = screen.getByText(/initializing/i);
    expect(terraConnectorEl).toBeInTheDocument();

    const titleEL = screen.queryByText(/give/i);
    expect(titleEL).toBeNull();
  });
  test("header doesn't show connect button but shows title instead", () => {
    render(
      <Wrapper initialEntries={["/login"]}>
        <Header />;
      </Wrapper>
    );

    screen.debug();
    const navEl = screen.queryByText(/initializing/i);
    expect(navEl).toBeNull();

    const titleEL = screen.getByText(/give/i);
    expect(titleEL).toBeInTheDocument();
  });
});
