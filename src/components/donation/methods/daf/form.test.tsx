import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, describe, expect, test, vi } from "vitest";
import {
  type DafDonationDetails,
  type Init,
  donation_recipient_init,
} from "../../types";
import { Form } from "./form";

const don_set_mock = vi.hoisted(() => vi.fn());
const don_mock = vi.hoisted(() => ({ value: {} }));
vi.mock("../../context", () => ({
  use_donation: vi
    .fn()
    .mockImplementation(() => ({ don: don_mock.value, don_set: don_set_mock })),
}));

describe("DAF form: initial load", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("initial form state: no persisted details", async () => {
    const init: Init = {
      base_url: "",
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
    };
    don_mock.value = init;

    render(<Form step="form" type="daf" />);

    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveDisplayValue("");

    //tip enabled by default
    expect(
      screen.getByRole("switch", { name: /support free fundraising tools/i })
    ).toBeChecked();
    // tip enabled and defaulted to 15%
    expect(screen.getByRole("radio", { name: /15%/i })).toBeChecked();

    //fee coverage disabled by default
    expect(
      screen.getByRole("switch", { name: /cover 3rd party processing fees/i })
    ).not.toBeChecked();

    // incrementers shown
    const incs = screen.getAllByTestId("incrementer");
    expect(incs).toHaveLength(4);
  });

  test("submit form with initial/persisted data", async () => {
    const init: Init = {
      base_url: "",
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
    };
    don_mock.value = init;

    const fv: DafDonationDetails = {
      amount: "100",
      cover_processing_fee: true,
      tip: "",
      tip_format: "20",
    };

    render(<Form fv={fv} type="daf" step="form" />);

    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveDisplayValue("100");
    expect(
      screen.getByRole("switch", { name: /support free fundraising tools/i })
    ).toBeChecked();
    expect(screen.getByRole("radio", { name: /20%/i })).toBeChecked();

    expect(
      screen.getByRole("switch", { name: /cover 3rd party processing fees/i })
    ).toBeChecked();

    // incrementers shown
    const incs = screen.getAllByTestId("incrementer");
    expect(incs).toHaveLength(4);

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);
    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });

  test("submitting empty form should show validation messages and focus first field: amount input", async () => {
    const init: Init = {
      base_url: "",
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
    };
    don_mock.value = init;

    render(<Form step="form" type="daf" />);

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    //amount input
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveFocus();
  });

  test("user corrects error and submits", async () => {
    const init: Init = {
      base_url: "",
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
    };
    don_mock.value = init;

    render(<Form type="daf" step="form" />);

    //submit empty form
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    //amount input required and focused
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveFocus();

    //user inputs valid amount
    await userEvent.type(amount_input, "50");
    expect(screen.queryByText(/please enter an amount/i)).toBeNull();

    await userEvent.click(continue_btn);

    //form submitted successfully
    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });
});
