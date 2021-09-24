import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

test("renders HOME at first load", () => {
  render(
    <MemoryRouter>
      <StaticWalletProvider defaultNetwork={testnet}>
        <App />
      </StaticWalletProvider>
    </MemoryRouter>
  );
  const h1Heading = screen.getByText(/simplified endowments/i);
  expect(h1Heading).toBeInTheDocument();
});
