import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPrograms } from "services/aws/programs/mock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { testDonateData } from "../../__tests__/test-data";
import type { Init, StocksDonationDetails } from "../../types";
import Form from "./form";

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));
const mockLoader = vi.hoisted(() => vi.fn());
vi.mock("@remix-run/react", async () => {
  const actual = await vi.importActual("@remix-run/react");
  return {
    ...actual,
    useLoaderData: mockLoader,
  };
});

beforeEach(() => {
  mockLoader.mockReturnValue(testDonateData);
});
afterEach(() => {
  mockLoader.mockReset();
});

describe("stocks form test", () => {
  test("initial state: blank", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "" },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const symbolInput = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbolInput).toHaveDisplayValue("");

    const qtyInput = screen.getByPlaceholderText(/enter quantity/i);
    expect(qtyInput).toHaveDisplayValue("");

    const programSelector = screen.getByLabelText(/select program/i);
    expect(programSelector).toBeInTheDocument();
  });
  test("initial blank state: program donations now allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", progDonationsAllowed: false },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const programSelector = screen.queryByLabelText(/select program/i);
    expect(programSelector).toBeNull();
  });
  test("initial state: persisted and submittable", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "" },
      mode: "live",
    };
    const details: StocksDonationDetails = {
      method: "stocks",
      symbol: "BG",
      numShares: "10",
      program: { value: mockPrograms[1].id, label: mockPrograms[1].title },
    };
    render(<Form init={init} step="donate-form" details={details} />);
    const symbolInput = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbolInput).toHaveDisplayValue("BG");

    const qtyInput = screen.getByPlaceholderText(/enter quantity/i);
    expect(qtyInput).toHaveDisplayValue("10");

    const selectedProgram = screen.getByText(/program 2/i);
    expect(selectedProgram).toBeInTheDocument();
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
    mockedSetState.mockReset();
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

    expect(screen.getAllByText(/required/i).length === 2);

    const symbolInput = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbolInput).toHaveFocus();

    //user inputs symbol
    await userEvent.type(symbolInput, "abc");
    expect(screen.getAllByText(/required/i).length === 1);

    //user tries to submit again, but quantity is required
    await userEvent.click(continueBtn);
    const qtyInput = screen.getByPlaceholderText(/enter quantity/i);
    expect(qtyInput).toHaveFocus();

    //user inputs quantity
    await userEvent.type(qtyInput, "abc");
    expect(screen.queryByText(/required/i)).toBeNull();
    expect(screen.getByText(/must be a number/i)).toBeInTheDocument();

    await userEvent.clear(qtyInput);
    await userEvent.type(qtyInput, "-5");
    expect(screen.getByText(/must be greater than 0/i)).toBeInTheDocument();

    await userEvent.clear(qtyInput);
    await userEvent.type(qtyInput, "10");

    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
  });
});
