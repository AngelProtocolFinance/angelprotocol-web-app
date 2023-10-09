import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ExtLink from "components/ExtLink";
import { TERMS_OF_USE } from "constants/urls";
import Split from "../../../Split";
import AdvancedOptions, {
  type AdvancedOptionsDisplay,
} from "../../AdvancedOptions";

type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  backLink?: string;
};
type FV = {
  pctLiquidSplit: number;
};

export default function Stripe({ advanceOptDisplay, backLink }: Props) {
  const methods = useForm<FV>({
    defaultValues: { pctLiquidSplit: 50 },
  });
  return (
    <FormProvider {...methods}>
      <form>
        <AdvancedOptions
          display={advanceOptDisplay}
          splitComponent={
            <Split<FV, "pctLiquidSplit">
              className="mb-6"
              liqPctField="pctLiquidSplit"
            />
          }
        />
        <p className="text-gray-d2 dark:text-gray mt-4">
          Please click the button below and follow the instructions provided to
          complete your donation
        </p>

        <div
          className={`flex gap-3 md:gap-5 ${
            backLink ? "justify-center" : "justify-between"
          } font-body mt-4`}
        >
          <button className="btn-orange btn-donate w-1/2" type="submit">
            Pay with stripe
          </button>
          {backLink && (
            <Link className="btn-outline-filled btn-donate w-1/2" to={backLink}>
              back
            </Link>
          )}
        </div>
        <p className="text-sm italic text-gray-d2 dark:text-gray mt-4">
          By making a donation, you agree to our{" "}
          <ExtLink className="underline text-orange" href={TERMS_OF_USE}>
            Terms & Conditions
          </ExtLink>
        </p>
      </form>
    </FormProvider>
  );
}
