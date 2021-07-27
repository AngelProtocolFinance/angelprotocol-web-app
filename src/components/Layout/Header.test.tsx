import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Without user", () => {
  test("Renders 'connect wallet'", () => {
    render(<Header />);
    const connectWalletEl = screen.getByText(/connect wallet/i);
    expect(connectWalletEl).toBeInTheDocument();
  });
});
