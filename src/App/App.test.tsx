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

test("App doesn't have / render yet", () => {
  render(
    <MemoryRouter>
      <StaticWalletProvider defaultNetwork={testnet}>
        <App />
      </StaticWalletProvider>
    </MemoryRouter>
  );
  screen.debug();
  const h1Heading = screen.queryByText(/simplified endowments/i);
  expect(h1Heading).toBeNull();
});
