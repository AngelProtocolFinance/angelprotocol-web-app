import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "./types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { handleMutationResult } from "helpers";
import { useRegState } from "../StepGuard";
import { getFilePreviews } from "./getFilePreviews";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty },
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
    sdg,
    ...documents
  }: FormValues) => {
    if (documentation && !isDirty) {
      return navigate(`../${step}`, { state: init });
    }

    const previews = await getFilePreviews({ ...documents });
    handleMutationResult(
      await updateReg({
        type: "documentation",
        reference: init.reference,
        //payload
        Website: website,
        UN_SDG: [sdg],
        ProofOfIdentity: previews.proofOfIdentity[0], //poi is level1 and required
        ProofOfRegistration: previews.proofOfRegistration[0], //por is level1 and required,
        FinancialStatements: previews.financialStatements,
        AuditedFinancialReports: previews.auditedFinancialReports,
        KycDonorsOnly:
          false /** TODO: move kyc checkbox from additional info to here */,
      }),
      handleError
    );
  };
  return handleSubmit(submit);
}
