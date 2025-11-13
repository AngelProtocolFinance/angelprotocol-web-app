import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, describe, expect, test, vi } from "vitest";
import {
  type Init,
  type StocksDonationDetails,
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

describe("Stocks form: initial load", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("initial form state: no persisted details", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
    };
    don_mock.value = init;

    render(<Form step="form" type="stocks" />);

    const symbol_input = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbol_input).toHaveDisplayValue("");

    const qty_input = screen.getByPlaceholderText(/enter quantity/i);
    expect(qty_input).toHaveDisplayValue("");
  });

  test("submit form with initial/persisted data", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
      user: { email: "john@doe.com", first_name: "John", last_name: "Doe" },
    };
    don_mock.value = init;

    const fv: StocksDonationDetails = {
      symbol: "BG",
      num_shares: "10",
      tip: "",
      tip_format: "15",
    };

    render(<Form fv={fv} type="stocks" step="form" />);

    const symbol_input = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbol_input).toHaveDisplayValue("BG");

    const qty_input = screen.getByPlaceholderText(/enter quantity/i);
    expect(qty_input).toHaveDisplayValue("10");

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);
    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });

  test("submitting empty form should show validation messages and focus first field: symbol input", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
    };
    don_mock.value = init;

    render(<Form step="form" type="stocks" />);

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    //symbol input required
    expect(
      screen.getByText(/please enter a stock symbol/i)
    ).toBeInTheDocument();

    const symbol_input = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbol_input).toHaveFocus();
  });

  test("user corrects error and submits", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
    };
    don_mock.value = init;

    render(<Form type="stocks" step="form" />);

    //submit empty form
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    //symbol input required and focused
    expect(
      screen.getByText(/please enter a stock symbol/i)
    ).toBeInTheDocument();
    const symbol_input = screen.getByPlaceholderText(/ex. aapl/i);
    expect(symbol_input).toHaveFocus();

    //user inputs symbol
    await userEvent.type(symbol_input, "AAPL");
    expect(screen.queryByText(/please enter a stock symbol/i)).toBeNull();

    //user tries to submit again, but quantity is required
    await userEvent.click(continue_btn);
    const qty_input = screen.getByPlaceholderText(/enter quantity/i);
    expect(qty_input).toHaveFocus();

    //user inputs invalid quantity (not a number)
    await userEvent.type(qty_input, "abc");
    expect(screen.queryByText(/please enter an amount/i)).toBeNull();
    expect(
      screen.getByText(/please enter a valid number/i)
    ).toBeInTheDocument();

    //user inputs negative quantity
    await userEvent.clear(qty_input);
    await userEvent.type(qty_input, "-5");
    expect(screen.getByText(/must be greater than 0/i)).toBeInTheDocument();

    //user inputs valid quantity
    await userEvent.clear(qty_input);
    await userEvent.type(qty_input, "10");
    expect(screen.queryByText(/must be greater than 0/i)).toBeNull();

    await userEvent.click(continue_btn);

    //form submitted successfully
    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });
});
