import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useRegState } from "../../StepGuard";
import { getFilePreviews } from "./getFilePreviews";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  const {
    step,
    data: { init, documentation },
  } = useRegState<2>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit = async ({
    website,
    hasAuthority,
    hasAgreedToTerms,
    sdgs,
    isKYCRequired,
    hqCountry,
    activeInCountries,
    endowDesignation,
    cashEligible,
    ...documents
  }: FormValues) => {
    try {
      if (documentation && !isDirty) {
        return navigate(`../${step}`, { state: init });
      }
      const previews = await getFilePreviews({ ...documents });
      await updateReg({
        type: "documentation",
        reference: init.reference,
        //payload
        Website: website,
        UN_SDG: sdgs.map(
          (sdg) => sdg.value
        ) /**TODO: AWS update to accept number[] */,
        ProofOfIdentity: previews.proofOfIdentity[0], //poi is level1 and required
        ProofOfRegistration: previews.proofOfRegistration[0], //por is level1 and required,
        KycDonorsOnly: isKYCRequired === "Yes",
        HqCountry: hqCountry.name,
        EndowDesignation: endowDesignation.value,
        ActiveInCountries: activeInCountries.map((opt) => opt.value),
        CashEligible: cashEligible,
      });
    } catch (err) {
      handleError(err);
    }
  };
  return { submit: handleSubmit(submit), isSubmitting };
}
