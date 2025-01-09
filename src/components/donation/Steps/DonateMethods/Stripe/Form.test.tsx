import { beforeEach } from "node:test";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPhpCurrency } from "services/apes/mock";
import { mockPrograms } from "services/aws/programs/mock";
import { describe, expect, test, vi } from "vitest";
import { testDonateData } from "../../__tests__/test-data";
import { usdOption } from "../../common/constants";
import type { Init, StripeDonationDetails } from "../../types";
import Form from "./Form";

const mockSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi.fn(() => ({ setState: mockSetState, state: {} })),
}));

const mockLoader = vi.hoisted(() => vi.fn());
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLoaderData: mockLoader,
  };
});

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

  test("test form loading", async () => {
    mockLoader.mockReturnValue(testDonateData);
    render(<Form step="donate-form" init={init} />);
    expect(screen.getByText(/loading donate form/i));

    await waitFor(() => {
      //after loading
      expect(screen.queryByText(/loading donate form/i)).toBeNull();
    });
    mockLoader.mockReset();
  });

  test("blank state: no default currency specified", async () => {
    mockLoader.mockReturnValue(testDonateData);
    render(<Form step="donate-form" init={init} />);
    const currencySelector = await screen.findByRole("combobox");
    expect(currencySelector).toHaveDisplayValue(/usd/i);
    mockLoader.mockReset();
  });

  test("initial state: user has preferred no currency", async () => {
    mockLoader.mockReturnValue({
      ...testDonateData,
      currencies: Promise.resolve({
        all: [usdOption],
        main: { code: "php", min: 50, rate: 50 },
      }),
    });
    render(<Form step="donate-form" init={init} />);

    //give monthly is frequency default option
    const freqOptions = await screen.findAllByRole("radio");
    expect(freqOptions[1]).not.toBeChecked();
    expect(freqOptions[0]).not.toBeChecked();

    const currencyInput = screen.getByRole("combobox");
    expect(currencyInput).toHaveDisplayValue(/php/i); //based on mock value

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
    render(<Form step="donate-form" init={init} />);

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
    render(<Form step="donate-form" init={init} details={details} />);

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("60");

    const selectedProgram = screen.getByText(/program 1/i);
    expect(selectedProgram).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    expect(mockSetState).toHaveBeenCalledOnce();
    mockSetState.mockReset();
  });

  test("user corrects validation errors", async () => {
    render(<Form step="donate-form" init={init} />);
    const continueBtn = screen.getByRole("button", { name: /continue/i });
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
    render(<Form step="donate-form" init={init} />);

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
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
