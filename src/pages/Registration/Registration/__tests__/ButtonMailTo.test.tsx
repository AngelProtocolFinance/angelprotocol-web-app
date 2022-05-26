import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import ButtonMailTo from "../ButtonMailTo";

type Props = { label: string; mailTo: string; subject: string };

const MockComponent = (props: Props) => {
  return (
    <MemoryRouter>
      <ButtonMailTo {...props} />
    </MemoryRouter>
  );
};

describe("ButtonMailTo tests", () => {
  it("matches snapshot", () => {
    const component = renderer.create(
      <MockComponent label="Label" mailTo="some@email.com" subject="Subject" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("opens email with correct recepient and subject", () => {
    const expectedLabel = "Label";
    const email = "test@email.com";
    render(
      <MockComponent
        label={expectedLabel}
        mailTo={email}
        subject="Charity Registration: Trouble with confirmation email"
      />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `mailto:${email}?subject=Charity%20Registration%3A%20Trouble%20with%20confirmation%20email`
    );
  });
});
