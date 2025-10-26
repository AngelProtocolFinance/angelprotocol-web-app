import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock_usd } from "services/apes/mock";
import { afterAll, describe, expect, test, vi } from "vitest";
import type { Init, StripeDonationDetails } from "../../types";
import { Form } from "./form";

const don_set_mock = vi.hoisted(() => vi.fn());
const don_mock = vi.hoisted(() => ({ value: {} }));
vi.mock("../../context", () => ({
  use_donation: vi
    .fn()
    .mockImplementation(() => ({ don: don_mock.value, don_set: don_set_mock })),
}));

describe("Stripe form: initial load", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("initial form state: no persisted details", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };
    don_mock.value = init;

    render(<Form step="form" type="stripe" />);

    // frequency selector must not be selected initially
    expect(
      screen.getByRole("radio", { name: /give monthly/i })
    ).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /give once/i })).not.toBeChecked();

    // currency selector loads at the beginning with USD default
    const currency_selector = screen.getByRole("combobox");
    expect(currency_selector).toHaveDisplayValue(/usd/i);
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText(/first name/i)).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText(/last name/i)).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("");
    //tip enabled by default
    expect(
      screen.getByRole("switch", { name: /support free fundraising tools/i })
    ).toBeChecked();
    // tip enabled and defaulted to 15%
    expect(screen.getByRole("radio", { name: /15%/i })).toBeChecked();

    //fee coverage disabled by default
    expect(
      screen.getByRole("switch", { name: /cover processing fee/i })
    ).not.toBeChecked();

    // incrementers shown since currency loads at the beginning
    const incs = screen.getAllByTestId("incrementer");
    expect(incs).toHaveLength(4);
  });

  test("submit form with initial/persisted data", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
      user: { email: "john@doe.com", first_name: "John", last_name: "Doe" },
    };
    don_mock.value = init;

    const fv: StripeDonationDetails = {
      amount: "100",
      currency: mock_usd,
      frequency: "one-time",
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.com",
      cover_processing_fee: true,
      tip: "",
      tip_format: "20",
    };

    render(<Form fv={fv} type="stripe" step="form" />);

    const currency_selector = screen.getByRole("combobox");
    expect(currency_selector).toHaveDisplayValue(fv.currency.code);
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      fv.amount
    );
    expect(screen.getByPlaceholderText(/first name/i)).toHaveDisplayValue(
      fv.first_name
    );
    expect(screen.getByPlaceholderText(/last name/i)).toHaveDisplayValue(
      fv.last_name
    );
    expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue(fv.email);
    expect(
      screen.getByRole("switch", { name: /support free fundraising tools/i })
    ).toBeChecked();
    expect(screen.getByRole("radio", { name: /20%/i })).toBeChecked();

    expect(
      screen.getByRole("switch", { name: /cover processing fee/i })
    ).toBeChecked();

    // incrementers shown since currency loads at the beginning
    const incs = screen.getAllByTestId("incrementer");
    expect(incs).toHaveLength(4);

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);
    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });

  test("submitting empty form should show validation messages and focus first field: amount input", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };
    don_mock.value = init;

    render(<Form step="form" type="stripe" />);

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    //amount input
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveFocus();
  });

  test("user corrects error and submits", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };
    don_mock.value = init;

    render(<Form type="stripe" step="form" />);

    //submit empty form
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    //amount input required and focused
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveFocus();

    //inputs amount below minimum
    await userEvent.type(amount_input, "0.5");
    await userEvent.click(continue_btn);

    //shows minimum validation error
    expect(screen.getByText(/less than min/i)).toBeInTheDocument();

    //user now inputs amount greater than minimum
    await userEvent.click(amount_input);
    await userEvent.clear(amount_input);
    await userEvent.type(amount_input, "2");
    expect(screen.queryByText(/less than min/i)).toBeNull();

    //user still needs to fill payment information
    await userEvent.click(continue_btn);
    const first_name_input = screen.getByPlaceholderText(/first name/i);
    expect(first_name_input).toHaveFocus();

    //user fills payment information
    await userEvent.type(first_name_input, "John");
    const last_name_input = screen.getByPlaceholderText(/last name/i);
    await userEvent.type(last_name_input, "Doe");
    const email_input = screen.getByPlaceholderText(/email/i);
    await userEvent.type(email_input, "john@doe.com");

    //user selects frequency before submitting
    const give_once_radio = screen.getByRole("radio", { name: /give once/i });
    await userEvent.click(give_once_radio);

    await userEvent.click(continue_btn);

    //form submitted successfully
    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });

  test("user selects frequency and submits", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };
    don_mock.value = init;

    render(<Form type="stripe" step="form" />);

    // verify frequency is not selected initially
    expect(
      screen.getByRole("radio", { name: /give monthly/i })
    ).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /give once/i })).not.toBeChecked();

    // user selects frequency
    const give_once_radio = screen.getByRole("radio", { name: /give once/i });
    await userEvent.click(give_once_radio);
    expect(give_once_radio).toBeChecked();

    // user fills in amount
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "50");

    // user fills in payment information
    const first_name_input = screen.getByPlaceholderText(/first name/i);
    await userEvent.type(first_name_input, "John");
    const last_name_input = screen.getByPlaceholderText(/last name/i);
    await userEvent.type(last_name_input, "Doe");
    const email_input = screen.getByPlaceholderText(/email/i);
    await userEvent.type(email_input, "john@doe.com");

    // user submits form
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });
});
