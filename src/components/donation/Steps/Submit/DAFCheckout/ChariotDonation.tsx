import ContentLoader from "components/ContentLoader";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import ChariotConnect from "react-chariot-connect";
import { useNavigate } from "react-router-dom";
import { useChariotGrantIntentMutation } from "services/apes";
import { DafCheckoutStep } from "slices/donation";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function ChariotCheckout(props: DafCheckoutStep) {
  const { details, recipient, liquidSplitPct, tip = 0, donor } = props;
  const [createGrant, { isLoading }] = useChariotGrantIntentMutation();

  const navigate = useNavigate();

  const { handleError } = useErrorContext();

  /** @see {@link https://givechariot.readme.io/reference/integrating-connect#prepopulate-data-into-your-connect-session} */
  const onDonationRequest = () => {
    return {
      amount: +details.amount * 100, // in cents
      firstName: props.donor.firstName,
      lastName: props.donor.lastName,
      email: props.donor.email,
    };
  };

  return (
    <>
      <ContentLoader className="rounded h-14 w-full group-has-[chariot-connect]:hidden" />

      {isLoading ? (
        <ContentLoader className="rounded h-12 w-full" />
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
                tipAmount: tip,
                usdRate: details.currency.rate,
                currency: details.currency.code,
                endowmentId: recipient.id,
                splitLiq: liquidSplitPct,
                transactionId: r.detail.workflowSessionId,
                donor,
              }).unwrap();

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
    </>
  );
}
