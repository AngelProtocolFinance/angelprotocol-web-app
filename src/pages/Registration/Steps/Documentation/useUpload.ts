import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useRegState } from "services/aws/registration/StepGuard";
import { useErrorContext } from "contexts/ErrorContext";
import { handleMutationResult } from "helpers";
import { getFilePreviews } from "./getFilePreviews";

export default function useUpload() {
  const { handleSubmit } = useFormContext<FormValues>();
  const [updateReg] = useUpdateRegMutation();
  const {
    data: { init },
  } = useRegState<2>();

  const { handleError } = useErrorContext();

  const upload = async ({
    website,
    hasAuthority,
    hasAgreedToTerms,
    sdg,
    ...documents
  }: FormValues) => {
    const previews = await getFilePreviews({ ...documents });
    handleMutationResult(
      await updateReg({
        type: "docs",
        reference: init.reference,
        //payload
        Website: website,
        UN_SDG: sdg,
        ProofOfIdentity: previews.proofOfIdentity[0], //poi is level1 and required
        ProofOfRegistration: previews.proofOfRegistration[0], //por is level1 and required,
        FinancialStatements: previews.financialStatements,
        AuditedFinancialReports: previews.annualReports,
      }),
      (result) => {
        console.log(result);
      },
      handleError
    );
  };
  return handleSubmit(upload);
}
