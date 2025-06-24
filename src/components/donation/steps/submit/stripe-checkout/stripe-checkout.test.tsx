import { createRemixStub } from "@remix-run/testing";
import type { Stripe, StripeError } from "@stripe/stripe-js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactNode, useEffect } from "react";
import { fiatDonationIntentCreationErrorHandler } from "services/api/mock";
import { mswServer } from "setup-tests";
import { describe, expect, test, vi } from "vitest";
import { DEFAULT_PROGRAM } from "../../common/constants";
import type { StripeCheckoutStep } from "../../types";
import Checkout from "./stripe-checkout";

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

const confirmPaymentMock = vi.hoisted(() => vi.fn());
const confirmSetupMock = vi.hoisted(() => vi.fn());

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
      confirmPayment: confirmPaymentMock,
      confirmSetup: confirmSetupMock,
    } as any;
    return stripe;
  }),
  useElements: vi.fn(() => ({})),
}));

const stb = (node: ReactNode) =>
  createRemixStub([{ path: "/", Component: () => node }]);

const state: StripeCheckoutStep = {
  init: {
    recipient: { id: "1", name: "test", members: [] },
    source: "bg-marketplace",
    mode: "live",
    config: null,
  },
  step: "submit",
  details: {
    method: "stripe",
    amount: "100",
    currency: { code: "usd", min: 1, rate: 1 },
    frequency: "subscription",
    program: DEFAULT_PROGRAM,
  },
  tip: { value: 17, format: "pct" },
  donor: {
    title: "",
    first_name: "first",
    last_name: "last",
    company_name: "",
    email: "donor@gmail.com",
    streetAddress: "street",
    zipCode: "123",
    ukTaxResident: false,
    publicMsg: "",
    msg_to_npo: "",
    is_with_msg_to_npo: false,
    isPublic: true,
  },
  feeAllowance: 10,
  honorary: {
    withHonorary: true,
    honoraryFullName: "first last",
    withTributeNotif: true,
    tributeNotif: {
      from_msg: "custom message",
      to_email: "to@gmail.com",
      to_fullname: "tofirst tolast",
    },
  },
};

describe("stripe checkout", () => {
  test("failed to get client secret", async () => {
    //suppress expected error boundary error
    vi.spyOn(console, "error").mockImplementation(() => null);
    mswServer.use(fiatDonationIntentCreationErrorHandler);
    render(<Checkout {...state} />);

    //getting client secret from proxy
    expect(screen.getByText(/loading payment form../i)).toBeInTheDocument();

    const errorMsg =
      "An unexpected error occurred and has been reported. Please get in touch with support@better.giving if the problem persists.";
    expect(await screen.findByText(errorMsg)).toBeInTheDocument();
  });

  test("stripe loading", async () => {
    render(<Checkout {...state} feeAllowance={5} /** reset cache */ />);

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
    const Stub = stb(<Checkout {...state} feeAllowance={5} />);
    render(<Stub />);
    const donateBtn = await screen.findByRole("button", {
      name: /donate now/i,
    });

    const err: StripeError = {
      type: "card_error",
      message: "invalid card",
    };

    if (state.details.frequency === "one-time")
      confirmPaymentMock.mockResolvedValueOnce({ error: err });
    else confirmSetupMock.mockResolvedValueOnce({ error: err });

    //user sees modal on card error
    await userEvent.click(donateBtn);
    const errorModal = screen.getByRole("dialog");
    expect(errorModal).toHaveTextContent(/invalid card/i);
  });

  test("unexpected error", async () => {
    const Stub = stb(<Checkout {...state} feeAllowance={5} />);
    render(<Stub />);
    const donateBtn = await screen.findByRole("button", {
      name: /donate now/i,
    });

    const err: StripeError = {
      type: "idempotency_error",
      message: "unhelpful error message that won't be shown",
    };

    if (state.details.frequency === "one-time")
      confirmPaymentMock.mockResolvedValueOnce({ error: err });
    else confirmSetupMock.mockResolvedValueOnce({ error: err });

    await userEvent.click(donateBtn);

    const errorModal = screen.getByRole("dialog");
    const genericError =
      "An unexpected error occurred while processing payment and has been reported. Please get in touch with support@better.giving if the problem persists.";
    expect(errorModal).toHaveTextContent(genericError);
  });
});
