import { CHARIOT_CONNECT_ID } from "constants/env";
import ChariotConnect from "react-chariot-connect";
import { useChariotGrantIntentMutation } from "services/apes";
import { ChariotCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";
import Err from "./Err";
import Loader from "./Loader";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function ChariotConnectCheckout(props: ChariotCheckoutStep) {
  const { details, recipient, kyc } = props;
  const [createGrant, { isLoading, isError }] = useChariotGrantIntentMutation();

  const dispatch = useSetter();

  /** @see {@link https://givechariot.readme.io/reference/integrating-connect#prepopulate-data-into-your-connect-session} */
  const onDonationRequest = () => {
    return {
      amount: +details.amount * 100, // in cents
      firstName: kyc?.name.first,
      lastName: kyc?.name.last,
      email: kyc?.kycEmail,
    };
  };

  return (
    <div className="grid content-start gap-8 p-4 @md:p-8">
      <BackBtn
        type="button"
        onClick={() => {
          const action = details.userOptForKYC
            ? setStep("kyc-form")
            : setStep("donate-form");
          dispatch(action);
        }}
      />

      {isLoading ? (
        <Loader msg="Processing donation..." />
      ) : isError ? (
        <Err />
      ) : (
        <ChariotConnect
          disabled={isLoading}
          cid={CHARIOT_CONNECT_ID}
          onDonationRequest={onDonationRequest}
          // This hook should be used to update our internal donation DB
          // see https://givechariot.readme.io/reference/integrating-connect#capture-your-grant-intent
          onSuccess={async (r: { detail: { workflowSessionId: string } }) => {
            await createGrant({
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
              transactionId: r.detail.workflowSessionId,
            });
          }}
        />
      )}
    </div>
  );
}
