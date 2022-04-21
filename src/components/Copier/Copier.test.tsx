import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Copier from "./Copier";

// Mock copy button
const CopyButton = () => {
  const textToCopy = "S4mple-Text+2_Copy0";
  return <Copier text={textToCopy} colorClass="text-angel-grey text-lg" />;
};

// Mock of Clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe("Copier component tests:", () => {
  // Renders the copy button for each test block
  let button;
  beforeEach(() => {
    render(<CopyButton />);

    // Looks for the copy button
    button = screen.getByRole("button");
  });

  test("copy button is visible", () => {
    expect(button).toBeInTheDocument();
  });

  test("should copy correct text and change appearance when clicked", async () => {
    jest.spyOn(navigator.clipboard, "writeText");

    // Clicks the copy button
    userEvent.click(button);

    await waitFor(() => {
      // Expects mock Clipboard API to be invoked
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("S4mple-Text+2_Copy0");
    });

    // Expects the button to change appearance once clicked
    expect(screen.getByTitle("Copied!"));
  });
});
