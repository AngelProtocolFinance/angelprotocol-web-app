import type { Stripe, StripeError } from "@stripe/stripe-js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactNode, useEffect } from "react";
import { createRoutesStub } from "react-router";
import { fiatDonationIntentCreationErrorHandler } from "services/api/mock";
import { mswServer } from "setup-tests";
import { describe, expect, test, vi } from "vitest";
import { type StripeDonationDetails, tip_fv_init } from "../../types";
import { StripeCheckout as Checkout } from "./checkout";

const don_set_mock = vi.hoisted(() => vi.fn());
const don_mock = vi.hoisted(() => ({
  recipient: { id: "1", name: "test", members: [] },
  source: "bg-marketplace",
  mode: "live",
  config: null,
  donor: {
    email: "john@doe.com",
    first_name: "John",
    last_name: "Doe",
  },
}));
vi.mock("../../context", () => ({
  use_donation: vi
    .fn()
    .mockReturnValue({ don: don_mock, don_set: don_set_mock }),
}));

const confirm_payment_mock = vi.hoisted(() => vi.fn());
const confirm_setup_mock = vi.hoisted(() => vi.fn());

vi.mock("@stripe/react-stripe-js", () => ({
  Elements: vi.fn(({ children }) => children),
  PaymentElement: vi.fn(({ onReady, onChange }: any) => {
    useEffect(() => {
      onChange({ complete: true });
      const id = setTimeout(onReady, 50);
      return () => {
        clearTimeout(id);
      };
    }, [onReady, onChange]);
    return <div />;
  }),
  useStripe: vi.fn(() => {
    const stripe: Stripe = {
      confirmPayment: confirm_payment_mock,
      confirmSetup: confirm_setup_mock,
    } as any;
    return stripe;
  }),
  useElements: vi.fn(() => ({})),
}));

const stb = (node: ReactNode) =>
  createRoutesStub([{ path: "/", Component: () => node }]);

const fv: StripeDonationDetails = {
  amount: "100",
  currency: { code: "usd", min: 1, rate: 1 },
  frequency: "recurring",
  ...tip_fv_init,
  cover_processing_fee: false,
};

describe("stripe checkout", () => {
  test("failed to get client secret", async () => {
    //suppress expected error boundary error
    vi.spyOn(console, "error").mockImplementation(() => null);
    mswServer.use(fiatDonationIntentCreationErrorHandler);
    render(<Checkout {...fv} />);

    //getting client secret from proxy
    expect(screen.getByText(/loading payment form../i)).toBeInTheDocument();

    const errorMsg =
      "An unexpected error occurred and has been reported. Please get in touch with support@better.giving if the problem persists.";
    expect(await screen.findByText(errorMsg)).toBeInTheDocument();
  });

  test("stripe loading", async () => {
    render(<Checkout {...fv} tip_format="20" /** reset cache */ />);

    //getting client secret from proxy
    expect(screen.getByText(/loading payment form../i)).toBeInTheDocument();
    const checkoutForm = await screen.findByTestId("stripe-checkout-form");
    expect(checkoutForm).toBeInTheDocument();

    //stripe is loading elements
    const stripeLoader = screen.getByTestId("loader");
    expect(stripeLoader).toBeInTheDocument();

    const continueBtn = await screen.findByRole("button", {
      name: /donate now/i,
    });
    expect(continueBtn).toBeInTheDocument();
  });

  test("card error", async () => {
    const Stub = stb(<Checkout {...fv} tip_format="20" />);
    render(<Stub />);
    const donateBtn = await screen.findByRole("button", {
      name: /donate now/i,
    });

    const err: StripeError = {
      type: "card_error",
      message: "invalid card",
    };

    if (fv.frequency === "one-time") {
      confirm_payment_mock.mockResolvedValueOnce({ error: err });
    } else confirm_setup_mock.mockResolvedValueOnce({ error: err });

    //user sees modal on card error
    await userEvent.click(donateBtn);
    const errorModal = screen.getByRole("dialog");
    expect(errorModal).toHaveTextContent(/invalid card/i);
  });

  test("unexpected error", async () => {
    const Stub = stb(<Checkout {...fv} tip_format="20" />);
    render(<Stub />);
    const donateBtn = await screen.findByRole("button", {
      name: /donate now/i,
    });

    const err: StripeError = {
      type: "idempotency_error",
      message: "unhelpful error message that won't be shown",
    };

    if (fv.frequency === "one-time")
      confirm_payment_mock.mockResolvedValueOnce({ error: err });
    else confirm_setup_mock.mockResolvedValueOnce({ error: err });

    await userEvent.click(donateBtn);

    const errorModal = screen.getByRole("dialog");
    const genericError =
      "An unexpected error occurred while processing payment and has been reported. Please get in touch with support@better.giving if the problem persists.";
    expect(errorModal).toHaveTextContent(genericError);
  });
});
