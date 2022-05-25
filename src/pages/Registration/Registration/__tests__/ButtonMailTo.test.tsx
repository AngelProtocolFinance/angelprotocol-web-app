import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import ButtonMailTo from "../ButtonMailTo";

type Props = { label: string; mailTo: string };

const MockComponent = ({ label, mailTo }: Props) => {
  return (
    <MemoryRouter>
      <ButtonMailTo label={label} mailTo={mailTo} />
    </MemoryRouter>
  );
};

describe("ButtonMailTo tests", () => {
  it("matches snapshot", () => {
    const component = renderer.create(
      <MockComponent label="Label" mailTo="some@email.com" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("opens email with correct recepient and subject", () => {
    const expectedLabel = "Label";
    const email = "test@email.com";
    render(<MockComponent label={expectedLabel} mailTo={email} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `mailto:${email}?subject=Charity%20Registration%3A%20Trouble%20with%20confirmation%20email`
    );
  });
});
