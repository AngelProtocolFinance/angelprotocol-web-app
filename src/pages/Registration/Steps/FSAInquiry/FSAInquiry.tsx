import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FV } from "./types";
import { Label, Radio } from "components/form";
import { LoadText } from "components/registration";
import { APP_NAME } from "constants/env";
import { steps } from "../../routes";
import { useRegState, withStepGuard } from "../StepGuard";
import useSubmit from "./useSubmit";

const countryWhiteList = ["United States"]; //will add more in the future;
function FSAInquiry() {
  const { data } = useRegState<3>();
  const possiblyTaxExempt = countryWhiteList.includes(
    data.orgDetails.HqCountry
  );
  const methods = useForm<FV>({
    defaultValues: {
      AuthorizedToReceiveTaxDeductibleDonations: data.fsaInquiry
        ?.AuthorizedToReceiveTaxDeductibleDonations
        ? "Yes"
        : "No",
    },
  });
  const { watch } = methods;
  const answer = watch("AuthorizedToReceiveTaxDeductibleDonations");
  const { submit, isSubmitting } = useSubmit(data, methods);

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={submit}>
        {possiblyTaxExempt ? (
          <>
            <Label className="mt-6">
              Is your organization recognized by the Internal Revenue Service as
              a nonprofit organization exempt under IRC 501(c)(3)?{" "}
            </Label>
            <div className="flex gap-4 mt-4 accent-orange text-sm">
              <Radio<FV, "AuthorizedToReceiveTaxDeductibleDonations">
                name="AuthorizedToReceiveTaxDeductibleDonations"
                value="Yes"
                disabled={!possiblyTaxExempt}
              />
              <Radio<FV, "AuthorizedToReceiveTaxDeductibleDonations">
                name="AuthorizedToReceiveTaxDeductibleDonations"
                value="No"
                disabled={!possiblyTaxExempt}
              />
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-d1 dark:text-gray leading-relaxed">
            Organizations in the{" "}
            <span className="font-semibold">{data.orgDetails.HqCountry}</span>{" "}
            are not recognized by the Internal Revenue Service as a nonprofit
            organization exempt under IRC 501(c)(3).
          </p>
        )}

        {!possiblyTaxExempt || answer === "No" ? (
          <p className="text-sm text-gray-d1 dark:text-gray leading-relaxed mt-4">
            {APP_NAME} provides fiscal sponsorship services at market-leading
            cost for our partner organizations to enable this ability (2.9%).
            Continue to setup fiscal sponsorship agreement.
          </p>
        ) : null}

        <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
          <Link
            aria-disabled={isSubmitting}
            to={`../${steps.orgDetails}`}
            state={data.init}
            className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
          >
            Back
          </Link>
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-3 min-w-[8rem] btn-orange btn-reg"
          >
            <LoadText isLoading={isSubmitting}>Continue</LoadText>
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default withStepGuard(FSAInquiry);
