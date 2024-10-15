import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { describe, expect, test, vi } from "vitest";
import { routes } from "../App";

const homeHeroText = /simplified giving, amplified impact/i;
const marketplaceHeroText = /better giving redefines/i;

const marketLink = /explore all causes/i;
const loginLink = /log in/i;
const signupLink = /sign up/i;

describe("App.tsx tests", () => {
  window.scrollTo = vi.fn() as any;

  test("Visit top level pages", async () => {
    const router = createMemoryRouter(routes);
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const footer = await screen.findByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    expect(screen.getByTestId("nav_dropdown")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: homeHeroText })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: loginLink })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: signupLink })).toBeInTheDocument();

    //user goes to Marketplace
    const marketplaceLinks = screen.getAllByRole("link", {
      name: marketLink,
    });

    fireEvent.click(marketplaceLinks[0]);

    expect(
      await screen.findByRole("heading", { name: marketplaceHeroText })
    ).toBeInTheDocument();
  });
});
