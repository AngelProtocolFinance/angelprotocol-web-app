import { Crypto } from "./checkouts/crypto";
import { ChariotCheckout } from "./checkouts/daf-checkout";
import { Stocks } from "./checkouts/stocks";
import { StripeCheckout } from "./checkouts/stripe-checkout";
import { use_donation_state } from "./context";
import { DonateMethods } from "./methods";

export function CurrentStep() {
  const { state } = use_donation_state();
  const { stripe, crypto, daf, stocks } = state;
  const method_states = [stripe, crypto, daf, stocks] as const;

  const checkout = method_states.find((m) => m?.step === "checkout");

  // checkout step
  switch (checkout?.type) {
    case "crypto": {
      return <Crypto {...checkout.fv} />;
    }
    case "stripe": {
      return <StripeCheckout {...checkout.fv} />;
    }
    case "stocks": {
      return <Stocks {...checkout.fv} />;
    }
    case "daf": {
      return <ChariotCheckout {...checkout.fv} />;
    }
  }

  return <DonateMethods {...state} />;
}
