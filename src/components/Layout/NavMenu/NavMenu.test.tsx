import { render, screen } from "@testing-library/react";
import NavMenu from ".";

test("renders NavMenu", () => {
  render(<NavMenu />);
  const linkElements = [
    "About Us",
    "About UNSDGs",
    "Donate Now",
    "For Charities",
  ].map((text) => {
    return screen.getByText(text);
  });

  linkElements.forEach((el) => {
    expect(el).toBeInTheDocument();
  });
});
