import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock_tokens } from "services/apes/mock";
import { afterAll, describe, expect, test, vi } from "vitest";
import {
  type CryptoDonationDetails,
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

describe("Crypto form: initial load", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("initial form state: no persisted details", async () => {
    const init: Init = {
      base_url: "",
      source: "bg-marketplace",
      config: null,
      recipient: {
        id: "0",
        name: "",
        members: [],
        donor_address_required: false,
      },
      mode: "live",
    };
    don_mock.value = init;

    render(<Form step="form" type="crypto" />);

    expect(screen.getByPlaceholderText(/select token/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue("");
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

    // incrementers not shown without selected token
    const incs = screen.queryAllByTestId("incrementer");
    expect(incs).toHaveLength(0);
  });

  test("submit form with initial/persisted data", async () => {
    const init: Init = {
      base_url: "",
      source: "bg-marketplace",
      config: null,
      recipient: donation_recipient_init(),
      mode: "live",
      user: { email: "john@doe.com", first_name: "John", last_name: "Doe" },
    };
    don_mock.value = init;

    const fv: CryptoDonationDetails = {
      token: { ...mock_tokens[0], amount: "100", min: 1, rate: 1 },
      cover_processing_fee: true,
      tip: "",
      tip_format: "20",
    };

    render(<Form fv={fv} type="crypto" step="form" />);

    expect(screen.getByPlaceholderText(/select token/i)).toHaveDisplayValue(
      fv.token.symbol
    );
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      fv.token.amount
    );

    expect(
      screen.getByRole("switch", { name: /support free fundraising tools/i })
    ).toBeChecked();
    expect(screen.getByRole("radio", { name: /20%/i })).toBeChecked();

    expect(
      screen.getByRole("switch", { name: /cover 3rd party processing fees/i })
    ).toBeChecked();

    // // incrementers not shown without selected token
    const incs = screen.getAllByTestId("incrementer");
    expect(incs).toHaveLength(4);

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
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

    render(<Form step="form" type="crypto" />);

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

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

    render(<Form type="crypto" step="form" />);

    //submit empty form
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    //amount input required and focused
    expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    expect(amount_input).toHaveFocus();

    //inputs amount but not selected token
    await userEvent.type(amount_input, "0.5");
    await userEvent.click(continue_btn);

    //inputs amount but not selected token
    expect(screen.getByText(/select token/i)).toBeInTheDocument();

    //user selects token
    const token_selector = screen.getByRole("combobox");
    await userEvent.click(token_selector);

    const token_opts = screen.getAllByRole("option");
    // options details best tested in some `TokenSelector.test.tsx`
    expect(token_opts.length).toBeGreaterThan(0);

    //user clicks first option
    await userEvent.click(token_opts[0]); //Bitcoin

    //token is loading, to get min amount

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
