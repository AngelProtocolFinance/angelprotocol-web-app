import { render, screen } from "@testing-library/react";
import CharityCategory from ".";

const data = require("./CharityCategory.fixture.json");

test("renders CharityCategory", () => {
  render(
    <CharityCategory
      title={"Category Title"}
      description={"Category Description"}
      cards={data.cards}
    />
  );

  const titleEl = screen.getByText("Category Title");
  expect(titleEl).toBeInTheDocument();

  const descriptionEl = screen.getByText("Category Description");
  expect(descriptionEl).toBeInTheDocument();
});
