import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { USD_CODE } from "../../common/constants";
import type { DafDonationDetails, Init } from "../../types";
import Form from "./form";

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

describe("DAF form test", () => {
  test("initial state: blank", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
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
  });

  test("initial blank state: program donations now allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: {
        id: "0",
        name: "",
        progDonationsAllowed: false,
        members: [],
      },
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
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };
    const details: DafDonationDetails = {
      method: "daf",
      amount: "100",
      currency: { code: USD_CODE, rate: 1, min: 1 },
      program: { label: "", value: "" },
    };
    render(<Form init={init} step="donate-form" details={details} />);
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("100");

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
    mockedSetState.mockReset();
  });
  test("user encounters validation errors and corrects them", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: {
        id: "0",
        name: "",
        progDonationsAllowed: false,
        members: [],
      },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amountInput, "50");
    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
  });
});
