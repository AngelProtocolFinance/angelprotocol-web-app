import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { PAYPAL_CLIENT_ID } from "constants/env";
import { usePaypalOrderQuery } from "services/apes";
import { PaypalCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import { currency } from "../../common/Currrency";
import Summary from "../../common/Summary";
import Err from "../Err";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function PaypalCheckout(props: PaypalCheckoutStep) {
  const { details, recipient, liquidSplitPct } = props;

  const {
    data: orderId,
    isLoading,
    isError,
    error,
  } = usePaypalOrderQuery({
    amount: +details.amount,
    currency: details.currency.code,
    endowmentId: recipient.id,
    email: props.donor.email,
    splitLiq: liquidSplitPct.toString(),
  });

  const dispatch = useSetter();

  return (
    <Summary
      classes={{
        container: "flex flex-col isolate p-4 @md:p-8",
        split: "mb-auto",
      }}
      Amount={currency(details.currency)}
      amount={+details.amount}
      splitLiq={liquidSplitPct}
      onBack={() => dispatch(setStep("summary"))}
    >
      {isLoading ? (
        <ContentLoader className="rounded h-14 w-full" />
      ) : isError || !orderId ? (
        <Err error={error} />
      ) : (
        <PayPalScriptProvider
          options={{
            clientId: PAYPAL_CLIENT_ID,
            commit: true,
            currency: "USD",
            enableFunding: "paylater",
            disableFunding: "card,venmo",
          }}
        >
          <div className="grid gap-5 w-full place-items-center">
            <Checkout orderId={orderId} source={details.source} />
          </div>
        </PayPalScriptProvider>
      )}
    </Summary>
  );
}
