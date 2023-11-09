import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useRegState } from "../../StepGuard";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  const {
    step,
    data: { init, orgDetails },
  } = useRegState<2>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    try {
      if (!isDirty && orgDetails) {
        return navigate(`../${step}`, { state: init });
      }

      await updateReg({
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
    } catch (err) {
      handleError(err);
    }
  };
  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
