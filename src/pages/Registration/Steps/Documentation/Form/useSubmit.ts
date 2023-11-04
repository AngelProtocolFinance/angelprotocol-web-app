import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useRegState } from "../../StepGuard";
import { getFilePreviews } from "./getFilePreviews";

export default function useSubmit() {
  const {
    watch,
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
  const isAuthorizedToReceiveTaxDeductibleDonations = watch(
    "isAuthorizedToReceiveTaxDeductibleDonations"
  );

  const submit: SubmitHandler<FormValues> = async ({
    website,
    sdgs,
    isAnonymousDonationsAllowed,
    hqCountry,
    activeInCountries,
    endowDesignation,
    ein,
    isAuthorizedToReceiveTaxDeductibleDonations,
    legalEntityType,
    projectDescription,
    proofOfIdentity,
    proofOfRegistration,
  }) => {
    try {
      if (!isDirty && documentation) {
        return navigate(`../${step}`, { state: init });
      }
      const previews = await getFilePreviews({
        proofOfIdentity,
        proofOfRegistration,
      });
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
        KycDonorsOnly: isAnonymousDonationsAllowed === "No",
        HqCountry: hqCountry.name,
        EndowDesignation: endowDesignation.value,
        ActiveInCountries: activeInCountries.map((opt) => opt.value),
        CashEligible: true,
        EIN: ein,
        AuthorizedToReceiveTaxDeductibleDonations:
          isAuthorizedToReceiveTaxDeductibleDonations === "Yes" ? true : false,
        LegalEntityType: legalEntityType,
        ProjectDescription: projectDescription,
      });
    } catch (err) {
      handleError(err);
    }
  };
  return {
    submit: handleSubmit(submit),
    isSubmitting,
    isAuthorizedToReceiveTaxDeductibleDonations,
  };
}
