import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { PAYPAL_CLIENT_ID } from "constants/env";
import { usePaypalOrderQuery } from "services/apes";
import { PaypalCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";
import Err from "../Err";
import currency from "../common/Currrency";
import Heading from "../common/Heading";
import SplitSummary from "../common/SplitSummary";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function PaypalCheckout(props: PaypalCheckoutStep) {
  const { details, recipient, kyc, liquidSplitPct } = props;

  const {
    data: orderId,
    isLoading,
    isError,
    error,
  } = usePaypalOrderQuery({
    amount: +details.amount,
    currency: details.currency.code,
    endowmentId: recipient.id,
    email: details.email,
    splitLiq: liquidSplitPct.toString(),
    kycData: kyc
      ? {
          city: kyc.city,
          country: kyc.country.name,
          fullName: `${kyc.name.first} ${kyc.name.last}`,
          kycEmail: kyc.kycEmail,
          streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
          state: kyc.usState.value || kyc.state,
          zipCode: kyc.postalCode,
        }
      : undefined,
  });

  const dispatch = useSetter();

  const Amount = currency(details.currency);

  return (
    <div className="flex flex-col isolate p-4 @md:p-8">
      <BackBtn onClick={() => dispatch(setStep("tip"))} type="button" />

      <Heading classes="my-4" />

      <SplitSummary
        amount={+details.amount}
        splitLiq={props.liquidSplitPct}
        classes="mb-auto"
        Donation={(n) => <Amount amount={n} classes="text-gray-d2" />}
        Liquid={(n) => <Amount amount={n} classes="text-sm" />}
        Locked={(n) => <Amount amount={n} classes="text-sm" />}
        tip={
          props.tip
            ? {
                charityName: props.recipient.name,
                value: props.tip,
                Tip: (n) => <Amount classes="text-gray-d2" amount={n} />,
                Total: (n) => <Amount classes="text-gray-d2" amount={n} />,
              }
            : undefined
        }
      />

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
    </div>
  );
}
