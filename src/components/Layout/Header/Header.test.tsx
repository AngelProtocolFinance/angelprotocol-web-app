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
  test("header has title and menu", () => {
    render(
      <Wrapper>
        <Header hasMenu={true} hasTitle={true} />;
      </Wrapper>
    );

    const navEl = screen.getByRole("list");
    expect(navEl).toBeInTheDocument();

    const titleEL = screen.getByText(/give/i);
    expect(titleEL).toBeInTheDocument();
  });
  test("header has menu and no title", () => {
    render(
      <Wrapper>
        <Header hasMenu={true} hasTitle={false} />;
      </Wrapper>
    );

    const navEl = screen.getByRole("list");
    expect(navEl).toBeInTheDocument();

    const titleEL = screen.queryByText(/give/i);
    expect(titleEL).toBeNull();
  });

  test("header has title and no menu", () => {
    render(
      <Wrapper>
        <Header hasMenu={false} hasTitle={true} />;
      </Wrapper>
    );

    const navEl = screen.queryByRole("list");
    expect(navEl).toBeNull();

    const titleEL = screen.getByText(/give/i);
    expect(titleEL).toBeInTheDocument();
  });

  test("header no menu and title", () => {
    render(
      <Wrapper>
        <Header hasMenu={false} hasTitle={false} />;
      </Wrapper>
    );

    const navEl = screen.queryByRole("list");
    expect(navEl).toBeNull();

    const titleEL = screen.queryByText(/give/i);
    expect(titleEL).toBeNull();
  });
});
