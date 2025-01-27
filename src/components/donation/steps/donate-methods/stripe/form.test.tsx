import { beforeEach } from "node:test";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPhpCurrency } from "services/apes/mock";
import { mockPrograms } from "services/aws/programs/mock";
import { describe, expect, test, vi } from "vitest";
import { stb } from "../../__tests__/test-data";
import type { Init, StripeDonationDetails } from "../../types";
import Form from "./form";

const mockSetState = vi.hoisted(() => vi.fn());
vi.mock("../../context", () => ({
  useDonationState: vi.fn(() => ({ setState: mockSetState, state: {} })),
}));

const init: Init = {
  source: "bg-marketplace",
  mode: "live",
  recipient: {
    id: "123456",
    name: "Example Endowment",
  },
  config: null,
};

const mockUseGetter = vi.hoisted(() => vi.fn());
vi.mock("store/accessors", () => ({
  useGetter: mockUseGetter,
}));

describe("Stripe form test", () => {
  beforeEach(() => vi.restoreAllMocks());

  test("blank state: no default currency specified", async () => {
    const Stub = stb(<Form step="donate-form" init={init} />);
    render(<Stub />);
    const currencySelector = await screen.findByRole("combobox");
    expect(currencySelector).toHaveDisplayValue(/usd/i);
  });

  test("initial state: user has preferred currency", async () => {
    const Stub = stb(<Form step="donate-form" init={init} />, {
      root: { currency: "php" },
    });
    render(<Stub />);

    //no default frequency
    const freqOptions = await screen.findAllByRole("radio");
    expect(freqOptions[1]).not.toBeChecked();
    expect(freqOptions[0]).not.toBeChecked();

    const currencyInput = screen.getByRole("combobox");
    //wait for use-effect to set currency
    await waitFor(() => expect(currencyInput).toHaveDisplayValue(/php/i));

    //amount input doesn't have default value
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("");

    const programSelector = screen.getByLabelText(/select program/i);
    expect(programSelector).toBeInTheDocument();
  });

  //currencies is cached at this point

  test("blank state: program donations not allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      mode: "live",
      recipient: {
        id: "123456",
        name: "Example Endowment",
        progDonationsAllowed: false,
      },
      config: null,
    };
    const Stub = stb(<Form step="donate-form" init={init} />);
    render(<Stub />);

    const programSelector = screen.queryByRole("button", {
      name: /general donation/i,
    });
    expect(programSelector).toBeNull();
  });

  test("prefilled state: user was able to continue", async () => {
    const { currency_code, minimum_amount, rate } = mockPhpCurrency;
    const details: StripeDonationDetails = {
      amount: "60",
      currency: { code: currency_code, min: minimum_amount, rate },
      frequency: "subscription",
      method: "stripe",
      program: { value: mockPrograms[0].id, label: mockPrograms[0].title },
    };
    const Stub = stb(<Form step="donate-form" init={init} details={details} />);
    render(<Stub />);

    const amountInput = await screen.findByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("60");

    const selectedProgram = screen.getByText(/program 1/i);
    expect(selectedProgram).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    expect(mockSetState).toHaveBeenCalledOnce();
    mockSetState.mockReset();
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
    expect(mockSetState).not.toHaveBeenCalled();

    //frequency selector errors out and corrected
    expect(screen.getByText(/required/i)).toBeInTheDocument();
    const freqOptions = screen.getAllByRole("radio");
    await userEvent.click(freqOptions[0]);
    expect(freqOptions[0]).toBeChecked();
    expect(screen.queryByText(/required/i)).toBeNull();

    //user submits again
    await userEvent.click(continueBtn);
    expect(mockSetState).not.toHaveBeenCalled();

    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();

    await userEvent.type(amountInput, "abc");
    expect(screen.getByText(/must be a number/i)).toBeInTheDocument();

    await userEvent.clear(amountInput);
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    await userEvent.type(amountInput, "20");
    expect(screen.getByText(/less than min/i)).toBeInTheDocument();

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "50");
    expect(screen.queryByText(/please enter an amount/i)).toBeNull();

    await userEvent.click(continueBtn);
    expect(mockSetState).toHaveBeenCalledOnce();
    mockSetState.mockReset();
  });

  test("incrementers", async () => {
    const Stub = stb(<Form step="donate-form" init={init} />, {
      root: { currency: "php" },
    });
    render(<Stub />);

    const amountInput = await screen.findByPlaceholderText(/enter amount/i);
    await userEvent.type(amountInput, "abc");

    //user tries to increment invalid input
    const incrementers = screen.getAllByTestId("incrementer");
    await userEvent.click(incrementers[0]);
    expect(screen.getByText(/must be a number/i)).toBeInTheDocument();
    expect(amountInput).toHaveFocus();

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "13");
    await userEvent.click(incrementers[0]); // 50PHP * 40
    expect(amountInput).toHaveDisplayValue("2013");

    await userEvent.click(incrementers[1]); // 50PHP * 100
    expect(amountInput).toHaveDisplayValue("7013");
  });
});
