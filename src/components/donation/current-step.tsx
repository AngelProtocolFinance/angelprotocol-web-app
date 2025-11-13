import { Crypto } from "./checkouts/crypto";
import { ChariotCheckout } from "./checkouts/daf";
import { Stocks } from "./checkouts/stocks";
import { StripeCheckout } from "./checkouts/stripe";
import { use_donation } from "./context";
import { DonorStep } from "./donor-step";
import { DonateMethods } from "./methods";

export function CurrentStep() {
  const { don, don_set } = use_donation();
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
  const d = method_states.find((m) => m?.step === "donor");
  if (d) {
    return (
      <DonorStep
        value={don.donor}
        on_change={(x) =>
          don_set((z) => ({
            ...z,
            donor: x,
            [d.type]: { ...don[d.type], step: "checkout" },
          }))
        }
        on_back={() => {
          don_set((z) => ({
            ...z,
            [d.type]: { ...don[d.type], step: "form" },
          }));
        }}
      />
    );
  }

  return <DonateMethods {...don} />;
}
