import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders Footer", () => {
  render(<Footer />);
  const linkElements = ["About Us", "About UNSDGs", "Terms & Privacy"].map(
    (text) => {
      return screen.getByText(text);
    }
  );

  linkElements.forEach((el) => {
    expect(el).toBeInTheDocument();
  });
});
