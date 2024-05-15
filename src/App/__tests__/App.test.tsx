import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { describe, expect, test, vi } from "vitest";
import App from "../App";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const homeHeroText = /Simplified Giving/i;
const marketplaceHeroText = /better giving redefines/i;

const marketLink = /explore all causes/i;
const loginLink = /log in/i;
const signupLink = /sign up/i;
const loaderTestId = "loader";

describe("App.tsx tests", () => {
  window.scrollTo = vi.fn() as any;

  test("Visit top level pages", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    // footer is immediately rendered
    // role here https://www.w3.org/TR/html-aria/#docconformance
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    expect(screen.getByTestId("nav_dropdown")).toBeInTheDocument();

    //home page is being lazy loaded
    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
    //home page is finally loaded
    expect(
      await screen.findByRole(
        "heading",
        { name: homeHeroText },
        { timeout: 3000 }
      )
    ).toBeInTheDocument();

    expect(screen.queryByTestId(loaderTestId)).toBeNull();

    expect(
      await screen.findByRole("link", { name: loginLink })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: signupLink })
    ).toBeInTheDocument();

    //user goes to Marketplace
    fireEvent.click(
      screen.getByRole("link", {
        name: marketLink,
      })
    );
    expect(
      await screen.findByRole("heading", { name: marketplaceHeroText })
    ).toBeInTheDocument();
    expect(screen.queryByTestId(loaderTestId)).toBeNull();
  });
});
