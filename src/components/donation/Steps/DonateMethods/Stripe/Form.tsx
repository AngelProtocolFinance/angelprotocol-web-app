import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Props } from "./types";
import { useCreateStripePaymentIntentMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import ExtLink from "components/ExtLink";
import Split from "components/Split";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import AdvancedOptions from "../../../AdvancedOptions";

type FV = {
  pctLiquidSplit: number;
};

export default function Form({
  advanceOptDisplay,
  onClientSecretLoaded,
  widgetConfig,
  state: {
    recipient: { id: endowId },
  },
}: Props & { onClientSecretLoaded: (clientSecret: string) => void }) {
  const methods = useForm<FV>({
    defaultValues: { pctLiquidSplit: 50 },
  });
  const { handleError } = useErrorContext();
  const [createPaymentIntent, { isLoading }] =
    useCreateStripePaymentIntentMutation();

  const isInsideWidget = widgetConfig !== null;

  const submit = methods.handleSubmit(async (fv) => {
    try {
      const { clientSecret } = await createPaymentIntent({
        amount: 0,
        endowId: endowId,
        liquidSplitPct: fv.pctLiquidSplit.toString(),
      }).unwrap();
      onClientSecretLoaded(clientSecret);
    } catch (err) {
      handleError(err, "Failed to load payment platform");
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>
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
      </form>
    </FormProvider>
  );
}
