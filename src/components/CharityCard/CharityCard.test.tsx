import { render, screen } from "@testing-library/react";
import CharityCard from ".";

test("renders Footer", () => {
  render(
    <CharityCard
      title={"Example Title"}
      description={"Example description"}
      backgroundImageUrl={""}
    />
  );

  const titleEl = screen.getByText("Example Title");
  expect(titleEl).toBeInTheDocument();

  const descriptionEl = screen.getByText("Example description");
  expect(descriptionEl).toBeInTheDocument();
});
