import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FV } from "./types";
import { Label, Radio } from "components/form";
import { LoadText } from "components/registration";
import { steps } from "../../routes";
import { useRegState, withStepGuard } from "../StepGuard";
import useSubmit from "./useSubmit";

function FSAInquiry() {
  const { data } = useRegState<3>();
  const methods = useForm<FV>({
    defaultValues: {
      AuthorizedToReceiveTaxDeductibleDonations: data.fsaInquiry
        ?.AuthorizedToReceiveTaxDeductibleDonations
        ? "Yes"
        : "No",
    },
  });
  const { submit, isSubmitting } = useSubmit(data, methods);

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={submit}>
        <Label className="mt-6">
          Is your organization recognized by the Internal Revenue Service as a
          nonprofit organization exempt under IRC 501(c)(3)?{" "}
        </Label>
        <div className="flex gap-4 mt-4 accent-orange text-sm">
          <Radio<FV, "AuthorizedToReceiveTaxDeductibleDonations">
            name="AuthorizedToReceiveTaxDeductibleDonations"
            value="Yes"
          />
          <Radio<FV, "AuthorizedToReceiveTaxDeductibleDonations">
            name="AuthorizedToReceiveTaxDeductibleDonations"
            value="No"
          />
        </div>
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
