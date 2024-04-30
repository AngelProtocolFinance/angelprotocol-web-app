import { useErrorContext } from "contexts/ErrorContext";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import { FormValues } from "../types";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  const {
    data: { init, orgDetails },
  } = useRegState<2>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    if (!isDirty && orgDetails) {
      return navigate(`../${steps.fsaInquiry}`, { state: init });
    }

    const result = await updateReg({
      type: "org-details",
      reference: init.reference,
      //payload
      Website: fv.Website,
      UN_SDG: fv.UN_SDG.map(
        (sdg) => sdg.value
      ) /**TODO: AWS update to accept number[] */,
      KycDonorsOnly: fv.isAnonymousDonationsAllowed === "No",
      HqCountry: fv.HqCountry.name,
      EndowDesignation: fv.EndowDesignation.value,
      ActiveInCountries: fv.ActiveInCountries.map((opt) => opt.value),
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
