import { beforeEach } from "node:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import {
  fiatCurrenciesErrorHandler,
  mockPhpCurrency,
} from "services/apes/mock";
import { mockPrograms } from "services/aws/programs";
import { mswServer } from "setupTests";
import { store } from "store/store";
import type { AuthenticatedUser } from "types/auth";
import { describe, expect, test, vi } from "vitest";
import type { Init, StripeDonationDetails } from "../../types";
import Form from "./Form";

const mockSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi.fn(() => ({ setState: mockSetState, state: {} })),
}));

const init: Init = {
  source: "bg-marketplace",
  mode: "live",
  recipient: {
    id: 123456,
    name: "Example Endowment",
  },
  config: null,
};

const _Form: typeof Form = (props) => (
  <Provider store={store}>{<Form {...props} />}</Provider>
);

const mockUseGetter = vi.hoisted(() => vi.fn());
vi.mock("store/accessors", () => ({
  useGetter: mockUseGetter,
}));

describe("Stripe form test", () => {
  beforeEach(() => vi.restoreAllMocks());

  test("failed to get currencies", async () => {
    mswServer.use(fiatCurrenciesErrorHandler);
    render(<_Form step="donate-form" init={init} />);
    expect(screen.getByText(/loading donate form/i));
    //after loading
    expect(
      await screen.findByText(/failed to load donate form/i)
    ).toBeInTheDocument();
  });

  test("blank state: no default currency specified", async () => {
    mockUseGetter.mockReturnValue(null);
    render(<_Form step="donate-form" init={init} />);
    const currencySelector = await screen.findByRole("combobox");
    expect(currencySelector).toHaveDisplayValue(/usd/i);
  });

  test("initial state: user has preferred currency", async () => {
    const user: Partial<AuthenticatedUser> = {
      token: "1231",
      prefCurrencyCode: "php",
    };
    mockUseGetter.mockReturnValue(user);

    render(<_Form step="donate-form" init={init} />);

    //give monthly is frequency default option
    const freqOptions = await screen.findAllByRole("radio");
    expect(freqOptions[0]).toHaveTextContent(/give monthly/i);
    expect(freqOptions[0]).toBeChecked();

    const currencyInput = screen.getByRole("combobox");
    expect(currencyInput).toHaveDisplayValue(/php/i); //based on mock value

    //amount input doesn't have default value
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("");

    const programSelector = screen.getByRole("button", {
      name: /general donation/i,
    });

    expect(programSelector).toBeInTheDocument();
  });

  //currencies is cached at this point

  test("blank state: program donations not allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      mode: "live",
      recipient: {
        id: 123456,
        name: "Example Endowment",
        progDonationsAllowed: false,
      },
      config: null,
    };
    render(<_Form step="donate-form" init={init} />);

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
    render(<_Form step="donate-form" init={init} details={details} />);

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("60");

    const programSelector = screen.getByRole("button", {
      name: /program 1/i,
    });
    expect(programSelector).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    expect(mockSetState).toHaveBeenCalledOnce();
    mockSetState.mockReset();
  });

  test("user corrects validation errors", async () => {
    render(<_Form step="donate-form" init={init} />);
    const continueBtn = screen.getByRole("button", { name: /continue/i });
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
    render(<_Form step="donate-form" init={init} />);

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
    expect(amountInput).toHaveDisplayValue("2013.00");

    await userEvent.click(incrementers[1]); // 50PHP * 100
    expect(amountInput).toHaveDisplayValue("7013.00");
  });
});
