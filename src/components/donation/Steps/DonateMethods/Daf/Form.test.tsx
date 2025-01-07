import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { testDonateData } from "../../__tests__/test-data";
import { DEFAULT_PROGRAM, USD_CODE } from "../../common/constants";
import type { DafDonationDetails, Init } from "../../types";
import Form from "./Form";

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

const mockLoader = vi.hoisted(() => vi.fn());
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLoaderData: mockLoader,
  };
});

describe("DAF form test", () => {
  test("initial state: blank", async () => {
    mockLoader.mockReturnValue(testDonateData);
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "" },
      mode: "live",
    };

    render(<Form init={init} step="donate-form" />);

    await waitFor(() => {
      //after loading
      expect(screen.queryByText(/loading donate form/i)).toBeNull();
    });

    const currencySelector = screen.getByRole("combobox");
    expect(currencySelector).toHaveDisplayValue(/usd/i);

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("");
    mockLoader.mockReset();
  });

  test("initial blank state: program donations now allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", progDonationsAllowed: false },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const programSelector = screen.queryByRole("button", {
      name: /general donation/i,
    });
    expect(programSelector).toBeNull();
  });

  test("initial state: persisted and submittable", async () => {
    mockLoader.mockReturnValue(testDonateData);
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "" },
      mode: "live",
    };
    const details: DafDonationDetails = {
      method: "daf",
      amount: "100",
      currency: { code: USD_CODE, rate: 1, min: 1 },
      program: DEFAULT_PROGRAM,
    };
    render(<Form init={init} step="donate-form" details={details} />);
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("100");

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
    mockedSetState.mockReset();
    mockLoader.mockReset();
  });
  test("user encounters validation errors and corrects them", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", progDonationsAllowed: false },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();

    //user inputs amount
    await userEvent.type(amountInput, "abc");
    expect(screen.getByText(/must be a number/i)).toBeInTheDocument();

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "-5");
    expect(screen.getByText(/must be greater than 0/i)).toBeInTheDocument();

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "50");

    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
  });
});
