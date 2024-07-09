import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalContext from "contexts/ModalContext";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { describe, expect, test, vi } from "vitest";
import { DEFAULT_PROGRAM } from "../../common/constants";
import type { StripeCheckoutStep } from "../../types";
import StripeCheckout from "./StripeCheckout";

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

vi.mock("@stripe/react-stripe-js", () => ({
  Elements: vi.fn(({ children }) => children),
  PaymentElement: vi.fn(({ onReady }: any) => {
    useEffect(() => {
      const id = setTimeout(onReady, 50);
      return () => {
        clearTimeout(id);
      };
    }, [onReady]);
    return <div />;
  }),
  useStripe: vi.fn(),
  useElements: vi.fn(),
}));

const Checkout: typeof StripeCheckout = (props) => (
  <Provider store={store}>
    <ModalContext>
      <StripeCheckout {...props} />
    </ModalContext>
  </Provider>
);

const state: StripeCheckoutStep = {
  init: {
    recipient: { id: 1, name: "test" },
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
  liquidSplitPct: 50,
  tip: { value: 17, format: "pct" },
  donor: {
    title: { value: "Mr", label: "Mr" },
    firstName: "first",
    lastName: "last",
    email: "donor@gmail.com",
    streetAddress: "street",
    zipCode: "123",
    ukTaxResident: false,
  },
  feeAllowance: 10,
  honorary: {
    withHonorary: true,
    honoraryFullName: "first last",
    withTributeNotif: true,
    tributeNotif: {
      fromMsg: "custom message",
      toEmail: "to@gmail.com",
      toFullName: "tofirst tolast",
    },
  },
};

describe("stripe checkout", () => {
  test("stripe loading", async () => {
    render(<Checkout {...state} />);

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
    await userEvent.click(continueBtn);
  });
});
