import { Crypto } from "./checkouts/crypto";
import { ChariotCheckout } from "./checkouts/daf-checkout";
import { Stocks } from "./checkouts/stocks";
import { StripeCheckout } from "./checkouts/stripe-checkout";
import { use_donation } from "./context";
import { DonateMethods } from "./methods";

export function CurrentStep() {
  const { don } = use_donation();
  const { stripe, crypto, daf, stocks } = don;
  const method_states = [stripe, crypto, daf, stocks] as const;

  const c = method_states.find((m) => m?.step === "checkout");

  // checkout step
  switch (c?.type) {
    case "crypto": {
      return <Crypto {...c.fv} />;
    }
    case "stripe": {
      return <StripeCheckout {...c.fv} />;
    }
    case "stocks": {
      return <Stocks {...c.fv} />;
    }
    case "daf": {
      return <ChariotCheckout {...c.fv} />;
    }
  }

  return <DonateMethods {...don} />;
}
