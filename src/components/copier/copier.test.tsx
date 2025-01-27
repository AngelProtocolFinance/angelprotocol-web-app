import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Copier from "./copier";

// Mock copy button
const CopyButton = () => {
  const textToCopy = "S4mple-Text+2_Copy0";
  return <Copier text={textToCopy} />;
};

// Mock of Clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe("Copier component test:", () => {
  test("copies correct text and able to change appearance when clicked", async () => {
    vi.spyOn(navigator.clipboard, "writeText");

    render(<CopyButton />);

    // Looks for the copy button
    const button = screen.getByRole("button");

    // Clicks the copy button
    await userEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "S4mple-Text+2_Copy0"
    );

    // Expects the button to change appearance once clicked
    expect(await screen.findByLabelText(/copied/i)).toBeInTheDocument();

    // Expects the button to revert back to it's original appearance
    expect(await screen.findByLabelText(/copy address/i)).toBeInTheDocument();
  });
});
