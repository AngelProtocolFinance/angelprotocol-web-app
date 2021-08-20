import { ReactNode } from "react";
import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./index";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

type WrapProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapProps) => (
  <MemoryRouter>
    <StaticWalletProvider defaultNetwork={testnet}>
      {children};
    </StaticWalletProvider>
  </MemoryRouter>
);

describe("Header renders nav menu depending on the option", () => {
  test("header has nav menu", () => {
    render(
      <Wrapper>
        <Header hasMenu={true} />;
      </Wrapper>
    );

    const navEl = screen.getByRole("list");
    expect(navEl).toBeInTheDocument();
  });

  test("header don't have menu", () => {
    render(
      <Wrapper>
        <Header hasMenu={false} />;
      </Wrapper>
    );

    const navEl = screen.queryByRole("list");
    expect(navEl).toBeNull();
  });
});
