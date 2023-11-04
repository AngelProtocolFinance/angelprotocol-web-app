import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { DonaterConfigFromWidget } from "types/widget";
import { useStripeSessionURLMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import ExtLink from "components/ExtLink";
import { FormStep } from "slices/donation";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import Split from "../../../Split";
import AdvancedOptions, {
  type AdvancedOptionsDisplay,
} from "../../AdvancedOptions";

type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};
type FV = {
  pctLiquidSplit: number;
};

export default function Stripe({
  advanceOptDisplay,
  widgetConfig,
  state,
}: Props) {
  const methods = useForm<FV>({
    defaultValues: { pctLiquidSplit: 50 },
  });

  const { handleError } = useErrorContext();
  const [sessionURLFn, { isLoading }] = useStripeSessionURLMutation();
  //additional state to keep button disabled while redirecting
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { handleSubmit } = methods;

  const isInsideWidget = widgetConfig !== null;
  const { id } = state.recipient;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(async (fv) => {
          try {
            const session = await sessionURLFn({
              endowId: id,
              liquidSplitPct: fv.pctLiquidSplit.toString(),
            }).unwrap();

            setIsRedirecting(true);
            window.location.href = session.url;
          } catch (err) {
            console.error(err);
            setIsRedirecting(false);
            handleError("Failed to load payment platform");
          }
        })}
      >
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
          <button
            disabled={isLoading || isRedirecting}
            className="btn-orange btn-donate w-1/2"
            type="submit"
          >
            {isLoading || isRedirecting ? "Processing..." : "Pay with stripe"}
          </button>
          {!isInsideWidget && (
            <Link
              className="btn-outline-filled btn-donate w-1/2"
              to={`${appRoutes.marketplace}/${id}`}
            >
              back
            </Link>
          )}
        </div>
        <p className="text-sm italic text-gray-d2 dark:text-gray mt-4">
          By making a donation, you agree to our{" "}
          <ExtLink className="underline text-orange" href={TERMS_OF_USE_DONOR}>
            Terms & Conditions
          </ExtLink>
        </p>
      </form>
    </FormProvider>
  );
}
