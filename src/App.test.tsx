import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import TestWalletProvider from "./test/helpers/TestWalletProvider";

test("renders learn react link", () => {
  render(
    <TestWalletProvider>
      <App />
    </TestWalletProvider>
  );
  const linkElement = screen.getByText(/post tx/i);
  expect(linkElement).toBeInTheDocument();
});
