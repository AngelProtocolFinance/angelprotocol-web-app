import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { DonaterConfigFromWidget } from "types/widget";
import { useCreateStripePaymentIntentMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import ExtLink from "components/ExtLink";
import { FormStep } from "slices/donation";
import useDebounce from "hooks/useDebounce";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import Split from "../../../Split";
import AdvancedOptions, {
  type AdvancedOptionsDisplay,
} from "../../AdvancedOptions";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};
type FV = {
  pctLiquidSplit: number;
};

// redirectUrl: `${window.location.origin}${appRoutes.donate_fiat_thanks}`

export default function Stripe({
  advanceOptDisplay,
  widgetConfig,
  state: {
    recipient: { id: endowId },
  },
}: Props) {
  const [clientSecret, setClientSecret] = useState("");

  const methods = useForm<FV>({
    defaultValues: { pctLiquidSplit: 50 },
  });
  const { handleError } = useErrorContext();
  const [createPaymentIntent, { isLoading }] =
    useCreateStripePaymentIntentMutation();

  const isInsideWidget = widgetConfig !== null;
  const pctLiquidSplit = methods.watch("pctLiquidSplit");

  useEffect(() => {
    (async () => {
      try {
        const { clientSecret } = await createPaymentIntent({
          amount: 0,
          endowId: endowId,
          liquidSplitPct: pctLiquidSplit.toString(),
        }).unwrap();
        setClientSecret(clientSecret);
      } catch (err) {
        handleError(err, "Failed to load payment platform");
      }
    })();
  }, [endowId, pctLiquidSplit, createPaymentIntent, handleError]);

  return (
    <FormProvider {...methods}>
      <AdvancedOptions
        display={advanceOptDisplay}
        splitComponent={
          <Split<FV, "pctLiquidSplit">
            className="mb-6"
            liqPctField="pctLiquidSplit"
          />
        }
      />
      <p className="text-sm text-gray-d2 dark:text-gray mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <div
        className={`flex gap-3 md:gap-5 ${
          isInsideWidget ? "justify-center" : "justify-between"
        } font-body mt-4`}
      >
        {!isInsideWidget && (
          <Link
            className="btn-outline-filled btn-donate w-1/2"
            to={`${appRoutes.marketplace}/${endowId}`}
          >
            back
          </Link>
        )}
        <button
          disabled={isLoading}
          className="btn-orange btn-donate w-1/2"
          type="submit"
        >
          {isLoading ? "Processing..." : "Pay with card"}
        </button>
      </div>
      <p className="text-sm italic text-gray-d2 dark:text-gray mt-4">
        By making a donation, you agree to our{" "}
        <ExtLink
          className="underline text-orange hover:text-orange-l2"
          href={TERMS_OF_USE_DONOR}
        >
          Terms & Conditions
        </ExtLink>
      </p>
    </FormProvider>
  );
}
