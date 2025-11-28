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

const mock_ticker = {
  symbol: "AAPL",
  name: "Apple Inc.",
  amount: "10",
  min: 1,
  rate: 150,
};

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

    expect(screen.getByPlaceholderText(/select ticker/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue("");
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
      ticker: mock_ticker,
      tip: "",
      tip_format: "15",
    };

    render(<Form fv={fv} type="stocks" step="form" />);

    expect(screen.getByPlaceholderText(/select ticker/i)).toHaveDisplayValue(
      fv.ticker.symbol
    );
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      fv.ticker.amount
    );

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);
    expect(don_set_mock).toHaveBeenCalledOnce();
    don_set_mock.mockReset();
  });

  test("submitting empty form should show validation messages and focus first field: amount input", async () => {
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

    //amount input required
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();

    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveFocus();
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

    //amount input required and focused
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveFocus();

    //inputs amount but not selected ticker
    await userEvent.type(amount_input, "0.5");
    await userEvent.click(continue_btn);

    //ticker not selected
    expect(screen.getByText(/select ticker/i)).toBeInTheDocument();

    //user selects ticker
    const ticker_selector = screen.getByRole("combobox");
    await userEvent.click(ticker_selector);

    const ticker_opts = screen.getAllByRole("option");
    expect(ticker_opts.length).toBeGreaterThan(0);

    //user clicks first option
    await userEvent.click(ticker_opts[0]);

    //ticker is loading, to get min amount
    expect(await screen.findByText(/less than minimum/i)).toBeInTheDocument();

    //user now inputs amount greater than minimum
    await userEvent.click(amount_input);
    await userEvent.clear(amount_input);
    await userEvent.type(amount_input, "2");
    expect(screen.queryByText(/less than minimum/i)).toBeNull();

    //user submits form and moves to donor step
    await userEvent.click(continue_btn);

    //form submitted successfully, navigates to donor step
    expect(don_set_mock).toHaveBeenCalledOnce();
  });
});
