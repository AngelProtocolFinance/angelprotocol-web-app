import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Website from "./Website";
import { site, web } from "types/routes";
import userEvent from "@testing-library/user-event";

describe("<Website/> reacts to routes", () => {
  //mock window function
  window.scrollTo = jest.fn();
  test("redirects to home when invalid route is typed in url bar", () => {
    //set page initially to /for-donors
    render(
      <MemoryRouter
        initialEntries={[`/a-route-that-is-not-in-switch`]}
        initialIndex={0}
      >
        <Website />
      </MemoryRouter>
    );
    const heroHeading = screen.getByText(/simplified endowments/i);
    expect(heroHeading).toBeInTheDocument();
  });
  test("scrolls to top when route changes", () => {
    //set page initially to /for-donors
    render(
      <MemoryRouter
        initialEntries={[`${site.home}${web.donors}`, site.home]}
        initialIndex={0}
      >
        <Website />
      </MemoryRouter>
    );

    //get home handle
    const homeLink = screen.getByTitle(/to home/i);

    //user clicks homelink
    userEvent.click(homeLink);

    //useScrollTop calls this function on route change
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
