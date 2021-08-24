import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavMenu from ".";

test("renders NavMenu", () => {
  render(
    <MemoryRouter>
      <NavMenu />
    </MemoryRouter>
  );
  //changed to list only for list items often change
  //will write interaction test for more confidence in routing
  const navListEl = screen.getByRole("list");
  expect(navListEl).toBeInTheDocument();
});
