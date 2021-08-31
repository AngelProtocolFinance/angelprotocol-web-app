import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import TestWalletProvider from "./test/helpers/TestWalletProvider";

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
