import { beforeEach } from "node:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock_usd } from "services/apes/mock";
import { describe, expect, test, vi } from "vitest";
import { stb } from "../__tests__/test-data";
import type { Init, State, StripeDonationDetails } from "../../types";
import { Form } from "./form";

const init: Init = {
  source: "bg-marketplace",
  mode: "live",
  recipient: {
    id: "123456",
    name: "Example Endowment",
    members: [],
  },
  config: null,
};

const mocked_set_state = vi.hoisted(() => vi.fn());
vi.mock("../../context", () => ({
  use_donation: vi.fn().mockReturnValue({
    state: {},
    set_state: mocked_set_state,
  }),
}));

describe("Stripe form test", () => {
  beforeEach(() => vi.restoreAllMocks());

  test("blank state: no default currency specified", async () => {
    const Stub = stb(<Form step="form" type="stripe" />);
    render(<Stub />);
    const currencySelector = await screen.findByRole("combobox");
    expect(currencySelector).toHaveDisplayValue(/usd/i);
  });

  test.only("prefilled state: user was able to continue", async () => {
    const details: StripeDonationDetails = {
      amount: "60",
      currency: mock_usd,
      frequency: "recurring",
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.com",
      cover_processing_fee: false,
      tip: "",
      tip_format: "15",
    };
    const Stub = stb(<Form step="form" fv={details} type="stripe" />);
    render(<Stub />);

    const amount_input = await screen.findByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveDisplayValue("60");

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    expect(mocked_set_state).toHaveBeenCalledOnce();
    mocked_set_state.mockReset();
  });

  test("user corrects validation errors", async () => {
    const Stub = stb(<Form step="donate-form" init={init} />, {
      root: { currency: "php" },
    });
    render(<Stub />);
    const continueBtn = await screen.findByRole("button", {
      name: /continue/i,
    });
    await userEvent.click(continueBtn);
    expect(mocked_set_state).not.toHaveBeenCalled();

    //frequency selector errors out and corrected
    expect(
      screen.getByText(/please select donation frequency/i)
    ).toBeInTheDocument();
    const freqOptions = screen.getAllByRole("radio");
    await userEvent.click(freqOptions[0]);
    expect(freqOptions[0]).toBeChecked();
    expect(screen.queryByText(/required/i)).toBeNull();

    //user submits again
    await userEvent.click(continueBtn);
    expect(mocked_set_state).not.toHaveBeenCalled();

    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();

    await userEvent.clear(amountInput);
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    await userEvent.type(amountInput, "0.5");
    expect(screen.getByText(/less than min/i)).toBeInTheDocument();

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "1");
    expect(screen.queryByText(/please enter an amount/i)).toBeNull();

    await userEvent.click(continueBtn);
    expect(mocked_set_state).toHaveBeenCalledOnce();
    mocked_set_state.mockReset();
  });

  test("incrementers", async () => {
    const Stub = stb(<Form step="donate-form" init={init} />, {
      root: { currency: "php" },
    });
    render(<Stub />);

    const amountInput = await screen.findByPlaceholderText(/enter amount/i);

    //user tries to increment invalid input
    const incrementers = screen.getAllByTestId("incrementer");

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "1000");
    await userEvent.click(incrementers[0]);
    expect(amountInput).toHaveDisplayValue("1040");

    await userEvent.click(incrementers[1]);
    expect(amountInput).toHaveDisplayValue("1140");
  });
});
