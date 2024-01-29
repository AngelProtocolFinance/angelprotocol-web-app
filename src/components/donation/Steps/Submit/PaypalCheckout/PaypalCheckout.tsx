import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { usePaypalOrderQuery } from "services/apes";
import { useSetter } from "store/accessors";
import { PaypalCheckoutStep, setStep } from "slices/donation";
import { PAYPAL_CLIENT_ID } from "constants/env";
import Err from "../Err";
import Loader from "../Loader";
import Checkout from "./Checkout";
import Icon from "components/Icon";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function PaypalCheckout(props: PaypalCheckoutStep) {
  const { details, recipient, kyc } = props;

  const {
    data: orderId,
    isLoading,
    isError,
  } = usePaypalOrderQuery({
    amount: +details.amount,
    currency: details.currency.code,
    endowmentId: recipient.id,
    email: details.email,
    splitLiq: details.pctLiquidSplit.toString(),
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

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-[16rem] isolate p-4 @md:p-8">
      <button
        onClick={() => {
          const action = details.userOptForKYC
            ? setStep("kyc-form")
            : setStep("donate-form");
          dispatch(action);
        }}
        type="button"
        className="flex items-center gap-1 font-semibold text-blue hover:text-blue-l1 active:text-blue-d1"
      >
        <Icon type="ArrowBack" strokeWidth={20} />
        <span>Back</span>
      </button>

      {isLoading ? (
        <Loader msg="Loading payment form..." />
      ) : isError || !orderId ? (
        <Err />
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
            <Checkout orderId={orderId} />
          </div>
        </PayPalScriptProvider>
      )}
    </div>
  );
}
