import ContentLoader from "components/ContentLoader";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import ChariotConnect from "react-chariot-connect";
import { useNavigate } from "react-router-dom";
import { useChariotGrantIntentMutation } from "services/apes";
import { ChariotCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";
import Err from "./Err";
import Currency from "./common/Currrency";
import Heading from "./common/Heading";
import SplitSummary from "./common/SplitSummary";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function ChariotConnectCheckout(props: ChariotCheckoutStep) {
  const { details, recipient, kyc, liquidSplitPct } = props;
  const [createGrant, { isLoading, isError, error }] =
    useChariotGrantIntentMutation();

  const dispatch = useSetter();
  const navigate = useNavigate();

  const { handleError } = useErrorContext();

  /** @see {@link https://givechariot.readme.io/reference/integrating-connect#prepopulate-data-into-your-connect-session} */
  const onDonationRequest = () => {
    return {
      amount: +details.amount * 100, // in cents
      firstName: kyc?.name.first,
      lastName: kyc?.name.last,
      email: kyc?.kycEmail,
    };
  };

  const currency = details.currency;
  const total = +details.amount;
  const liq = total * (liquidSplitPct / 100);
  const locked = total - liq;

  return (
    <div className="flex flex-col content-start p-4 @md:p-8 group">
      <BackBtn
        type="button"
        onClick={() => {
          const action = details.userOptForKYC
            ? setStep("kyc-form")
            : setStep("donate-form");
          dispatch(action);
        }}
      />

      <Heading classes="my-4" />

      <SplitSummary
        classes="mb-auto"
        total={<Currency {...currency} amount={total} classes="text-gray-d2" />}
        liquid={<Currency {...currency} amount={liq} classes="text-sm" />}
        locked={<Currency {...currency} amount={locked} classes="text-sm" />}
      />

      {/** <CharioConnect/> is not yet rendered */}
      <ContentLoader className="rounded h-14 w-full group-has-[chariot-connect]:hidden" />

      {isLoading ? (
        <ContentLoader className="rounded h-12 w-full" />
      ) : isError ? (
        <Err error={error} />
      ) : (
        <ChariotConnect
          disabled={isLoading}
          cid={CHARIOT_CONNECT_ID}
          onDonationRequest={onDonationRequest}
          // This hook should be used to update our internal donation DB
          // see https://givechariot.readme.io/reference/integrating-connect#capture-your-grant-intent
          onSuccess={async (r: { detail: { workflowSessionId: string } }) => {
            try {
              await createGrant({
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
                transactionId: r.detail.workflowSessionId,
              });

              navigate(
                details.source === "bg-widget"
                  ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_fiat_thanks}`
                  : appRoutes.donate_fiat_thanks
              );
            } catch (error) {
              handleError(error, GENERIC_ERROR_MESSAGE);
            }
          }}
        />
      )}
    </div>
  );
}
