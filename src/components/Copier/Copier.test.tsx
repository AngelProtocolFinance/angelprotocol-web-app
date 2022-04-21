import { render, screen, waitFor } from "@testing-library/react";
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
  test("copy button is visible", () => {
    render(<CopyButton />);

    // Looks for the copy button
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  test("should copy correct text and change appearance when clicked", async () => {
    jest.spyOn(navigator.clipboard, "writeText");

    render(<CopyButton />);

    // Looks for the copy button
    const button = screen.getByRole("button");

    // Clicks the copy button
    userEvent.click(button);

    await waitFor(() => {
      // Expects mock Clipboard API to be invoked
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "S4mple-Text+2_Copy0"
      );
    });

    // Expects the button to change appearance once clicked
    expect(screen.getByTitle("Copied!")).toBeInTheDocument();
  });
});
