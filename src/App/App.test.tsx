import { render, screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import AppWrapper from "test/AppWrapper";
import { siteRoutes } from "constants/routes";
import App from "./App";

// define initial routes
const routes = [`${siteRoutes.app}`];

function TestApp() {
  return (
    <AppWrapper routes={routes} startingRouteIndex={0}>
      <Routes>
        <Route path={siteRoutes.app + "/*"} element={<App />} />
      </Routes>
    </AppWrapper>
  );
}

describe("User visits app", () => {
  window.scrollTo = jest.fn();
  test("App's default page is lazy loaded Marketplace", async () => {
    render(<TestApp />);

    //header is immediately rendered
    //role here https://www.w3.org/TR/html-aria/#docconformance
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    //footer is immediately rendered
    //role here https://www.w3.org/TR/html-aria/#docconformance
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    //loader is rendered because content is being lazy loaded
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    //view is not yet rendered and being lazy loaded
    const text1 = /angel protocol supports/i;
    const text2 = /displaced ukrainians/i;
    expect(screen.queryByText(text1)).toBeNull();
    expect(screen.queryByText(text2)).toBeNull();

    //view is finally loaded,
    expect(await screen.findByText(text1)).toBeInTheDocument();
    expect(await screen.findByText(text2)).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
  });
});
