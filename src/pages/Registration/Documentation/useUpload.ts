import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentationValues } from "pages/Registration/types";
import {
  useRegistrationQuery,
  useUpdateDocumentationMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { appRoutes } from "constants/routes";
import { GENERIC_ERROR_MESSAGE } from "../constants";
import routes from "../routes";
import { getFilePreviews } from "./getFilePreviews";

export default function useUpload() {
  const [uploadDocumentation] = useUpdateDocumentationMutation();
  const { application } = useRegistrationQuery();
  const navigate = useNavigate();

  const { handleError } = useErrorContext();

  const upload = useCallback(
    async ({
      website,
      checkedAuthority,
      checkedPolicy,
      un_sdg,
      ...documents
    }: DocumentationValues) => {
      try {
        const previews = await getFilePreviews({ ...documents });

        const result = await uploadDocumentation({
          PK: application.ContactPerson.PK,
          body: {
            Website: website,
            UN_SDG: un_sdg,
            ProofOfIdentity: previews.proofOfIdentity[0],
            ProofOfRegistration: previews.proofOfRegistration[0],
            FinancialStatements: previews.financialStatements,
            AuditedFinancialReports: previews.auditedFinancialReports,
          },
        });

        if ("error" in result) {
          return handleError(result.error, GENERIC_ERROR_MESSAGE);
        }

        const route = application.Metadata.JunoWallet
          ? routes.dashboard
          : routes.additionalInformation;
        navigate(`${appRoutes.register}/${route}`);
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    },
    [application, handleError, uploadDocumentation, navigate]
  );

  return upload;
}
