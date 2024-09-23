import { useErrorContext } from "contexts/ErrorContext";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import type { FormValues } from "../types";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  const {
    data: { init, org },
  } = useRegState<2>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    if (!isDirty && org) {
      return navigate(`../${steps.fsaInquiry}`, { state: init });
    }

    const result = await updateReg({
      type: "org",
      id: init.id,
      //payload
      website: fv.website,
      un_sdg: fv.un_sdg.map(
        (sdg) => sdg.value
      ) /**TODO: AWS update to accept number[] */,
      kyc_donors_only: fv.isAnonymousDonationsAllowed === "no",
      hq_country: fv.hq_country.name,
      designation: fv.designation.value,
      active_in_countries: fv.active_in_countries.map((opt) => opt.value),
    });

    if ("error" in result) {
      return handleError(result.error, { context: "updating registration" });
    }

    navigate(`../${steps.fsaInquiry}`, { state: init });
  };
  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
