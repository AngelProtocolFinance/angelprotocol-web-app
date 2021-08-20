import { render, screen } from "@testing-library/react";
import App from "./App";
import TestWalletProvider from "./test/helpers/TestWalletProvider";
import { MemoryRouter } from "react-router-dom";

test("renders HOME at first load", () => {
  render(
    <MemoryRouter>
      <TestWalletProvider>
        <App />
      </TestWalletProvider>
    </MemoryRouter>
  );
  const h1Heading = screen.getByRole("heading");
  expect(h1Heading).toHaveTextContent("HOME");
});
