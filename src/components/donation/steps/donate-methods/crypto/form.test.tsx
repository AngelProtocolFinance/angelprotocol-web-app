import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock_tokens } from "services/apes/mock";
import { afterAll, describe, expect, test, vi } from "vitest";
import type { CryptoFormStep, Init } from "../../types";
import { Form } from "./form";

const mocked_set_state = vi.hoisted(() => vi.fn());
vi.mock("../../context", () => ({
  use_donation_state: vi
    .fn()
    .mockReturnValue({ state: {}, set_state: mocked_set_state }),
}));

describe("Crypto form: initial load", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("initial form state: no persisted details", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);

    expect(screen.getByPlaceholderText(/select token/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveDisplayValue("");
  });

  test("submit form with initial/persisted data", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };

    const amount = "100";
    const state: CryptoFormStep = {
      step: "donate-form",
      init,
      details: {
        method: "crypto",
        token: { ...mock_tokens[1], amount, min: 1, rate: 1 },
      },
    } as const;
    render(<Form {...state} />);

    const amountInput = screen.getByRole("textbox");
    expect(amountInput).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mocked_set_state).toHaveBeenCalledOnce();
    mocked_set_state.mockReset();
  });

  test("submitting empty form should show validation messages and focus first field: amount input", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    //amount input
    expect(screen.getByText(/required/i)).toBeInTheDocument();

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();
  });

  test("user corrects error and submits", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);

    //submit empty form
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    //amount input required and focused
    expect(screen.getByText(/required/i)).toBeInTheDocument();
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();

    //inputs amount but not selected token
    await userEvent.type(amountInput, "0.5");
    await userEvent.click(continueBtn);
    //inputs amount but not selected token
    expect(screen.getByRole("paragraph")).toHaveTextContent(/select token/i);

    //user selects token
    const tokenSelector = screen.getByPlaceholderText(/select token/i);
    await userEvent.click(tokenSelector);

    const tokenOptions = screen.getAllByRole("option");
    // options details best tested in some `TokenSelector.test.tsx`
    expect(tokenOptions.length).toBeGreaterThan(0);

    //user clicks first option
    await userEvent.click(tokenOptions[0]); //Bitcoin

    //token is loading, to get min amount

    expect(await screen.findByText(/less than minimum/i)).toBeInTheDocument();

    //user now inputs amount greater than minimum
    await userEvent.click(amountInput);
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "2");
    expect(screen.queryByText(/less than minimum/i)).toBeNull();

    //user should be able to submit now
    await userEvent.click(continueBtn);
    //second click now
    expect(mocked_set_state).toHaveBeenCalledOnce();
  });
});
