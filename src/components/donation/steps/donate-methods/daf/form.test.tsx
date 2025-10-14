import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { USD_CODE } from "../../common/constants";
import type { DafDonationDetails, Init } from "../../types";
import { Form } from "./form";

const mocked_set_state = vi.hoisted(() => vi.fn());
vi.mock("../../context", () => ({
  use_donation_state: vi
    .fn()
    .mockReturnValue({ state: {}, set_state: mocked_set_state }),
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

    const amountInput = screen.getByPlaceholderText(/\$ enter amount/i);
    expect(amountInput).toHaveDisplayValue("");
  });

  test("initial blank state: program donations now allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
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
    };
    render(<Form init={init} step="donate-form" details={details} />);
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveDisplayValue("$ 100");

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mocked_set_state).toHaveBeenCalledOnce();
    mocked_set_state.mockReset();
  });
  test("user encounters validation errors and corrects them", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };
    render(<Form init={init} step="donate-form" />);
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amountInput, "50");
    await userEvent.click(continueBtn);
    expect(mocked_set_state).toHaveBeenCalledOnce();
  });
});
