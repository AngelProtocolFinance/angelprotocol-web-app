import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import {
  useRegistrationQuery,
  useUpdateDocumentationMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { GENERIC_ERROR_MESSAGE } from "../../constants";
import { getFilePreviews } from "./getFilePreviews";

export default function useUpload() {
  const { handleSubmit } = useFormContext<FormValues>();
  const [uploadDocumentation] = useUpdateDocumentationMutation();
  const { application } = useRegistrationQuery();

  const { handleError } = useErrorContext();

  const upload = async ({
    website,
    hasAuthority,
    hasAgreedToTerms,
    isKYCRequired,
    sdg,
    ...documents
  }: FormValues) => {
    try {
      const previews = await getFilePreviews({ ...documents });

      const result = await uploadDocumentation({
        PK: application.ContactPerson.PK,
        body: {
          Website: website,
          UN_SDG: sdg,
          ProofOfIdentity: previews.proofOfIdentity[0],
          ProofOfRegistration: previews.proofOfRegistration[0],
          FinancialStatements: previews.financialStatements,
          AuditedFinancialReports: previews.annualReports,
        },
      });

      if ("error" in result) {
        return handleError(result.error, GENERIC_ERROR_MESSAGE);
      }
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  };
  return handleSubmit(upload);
}
