import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from ".";

test("renders Footer", () => {
  render(
    <MemoryRouter>
      <Footer hasMenu={true} />
    </MemoryRouter>
  );
  //changed to list only for list items often change
  const navListEl = screen.getByRole("list");
  expect(navListEl).toBeInTheDocument();
});
