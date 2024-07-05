import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as programs from "services/aws/programs";
import type { Program } from "types/aws";
import { describe, expect, test, vi } from "vitest";
import type { Init, StocksDonationDetails } from "../../types";
import Form from "./Form";

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

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

describe("stocks form test", () => {
  test("initial state: blank", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "" },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const symbolInput = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbolInput).toHaveDisplayValue("");

    const qtyInput = screen.getByPlaceholderText(/enter quantity/i);
    expect(qtyInput).toHaveDisplayValue("");

    const programSelector = screen.getByRole("button", {
      name: /general donation/i,
    });
    expect(programSelector).toBeInTheDocument();
  });
  test("initial blank state: program donations now allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "", progDonationsAllowed: false },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const programSelector = screen.queryByRole("button", {
      name: /general donation/i,
    });
    expect(programSelector).toBeNull();
  });
  test("initial state: persisted and submittable", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "" },
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

    const programSelector = screen.getByRole("button", {
      name: /program 2/i,
    });
    expect(programSelector).toBeInTheDocument();
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
    mockedSetState.mockReset();
  });
  test("user encounters validation errors and corrects them", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "", progDonationsAllowed: false },
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
