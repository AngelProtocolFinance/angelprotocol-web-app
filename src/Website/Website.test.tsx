import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Website from "./Website";
import { site, web } from "types/routes";
import userEvent from "@testing-library/user-event";

describe("Page scrolls to top on user route navigation", () => {
  test("renders blue logo on <Website/>", async () => {
    //set page initially to /for-donors
    window.scrollTo = jest.fn();
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
