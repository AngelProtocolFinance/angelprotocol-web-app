import { afterEach } from "node:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as apes from "services/apes";
import * as programs from "services/aws/programs";
import type { Program } from "types/aws";
import type { DetailedCurrency } from "types/components";
import { describe, expect, test, vi } from "vitest";
import type { Init, StripeDonationDetails } from "../../types";
import Form from "./Form";

const defaultCurrency: DetailedCurrency = {
  code: "PHP",
  rate: 50,
  min: 50,
};
const mockCurrencies: DetailedCurrency[] = [
  { code: "EUR", rate: 0.92, min: 0.92 },
  { code: "USD", rate: 1, min: 1 },
  { code: "GBP", rate: 0.79, min: 0.79 },
];

const currenciesQuery = vi
  .spyOn(apes, "useFiatCurrenciesQuery")
  .mockReturnValue({
    data: {
      currencies: mockCurrencies,
      defaultCurr: defaultCurrency,
    },
    isLoading: false,
    isError: false,
    error: null,
    refetch: () => ({}) as any,
  });

const mockPrograms: Program[] = [
  {
    id: "program-1",
    title: "Program 1",
    description: "Description for Program 1",
    milestones: [],
  },
  {
    id: "program-2",
    title: "Program 2",
    description: "Description for Program 2",
    milestones: [],
  },
];

vi.spyOn(programs, "useProgramsQuery").mockReturnValue({
  data: mockPrograms,
  isLoading: false,
  isFetching: false,
  isError: false,
  refetch: () => ({}) as any,
});

vi.mock("store/accessors", () => ({
  useGetter: vi.fn(() => null),
}));

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

describe("Stripe form test", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("initial state", () => {
    render(<Form step="donate-form" init={init} />);

    //give monthly is frequency default option
    const freqOptions = screen.getAllByRole("radio");
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
  test("form is loading", () => {
    currenciesQuery.mockReturnValueOnce({
      refetch: () => ({}) as any,
      data: undefined,
      isLoading: true,
    });
    render(<Form step="donate-form" init={init} />);
    expect(screen.getByText(/loading donate form/i));
  });
  test("failed to get currencies", () => {
    currenciesQuery.mockReturnValueOnce({
      refetch: () => ({}) as any,
      isLoading: false,
      isError: true,
    });
    render(<Form step="donate-form" init={init} />);
    expect(screen.getByText(/failed to load donate form/i));
  });
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
    render(<Form step="donate-form" init={init} />);

    const programSelector = screen.queryByRole("button", {
      name: /general donation/i,
    });
    expect(programSelector).toBeNull();
  });

  test("blank state: no default currency specified", () => {
    currenciesQuery.mockReturnValueOnce({
      refetch: () => ({}) as any,
      data: { currencies: mockCurrencies },
    });
    render(<Form step="donate-form" init={init} />);
    const currencySelector = screen.getByRole("combobox");
    expect(currencySelector).toHaveDisplayValue(/usd/i);
  });

  test("prefilled state: user was able to continue", async () => {
    const details: StripeDonationDetails = {
      amount: "60",
      currency: defaultCurrency,
      frequency: "subscription",
      method: "stripe",
      program: { value: mockPrograms[0].id, label: mockPrograms[0].title },
    };
    render(<Form step="donate-form" init={init} details={details} />);

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
    render(<Form step="donate-form" init={init} />);
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
