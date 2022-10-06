import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentationValues } from "pages/Registration/types";
import {
  useRegistrationQuery,
  useUpdateDocumentationMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { FileWrapper } from "components/FileDropzone";
import { logger, uploadToIpfs } from "helpers";
import { appRoutes } from "constants/routes";
import { GENERIC_ERROR_MESSAGE } from "../constants";
import routes from "../routes";

export default function useUpload() {
  const [uploadDocumentation] = useUpdateDocumentationMutation();
  const { application } = useRegistrationQuery();
  const navigate = useNavigate();

  const { handleError } = useErrorContext();

  const upload = useCallback(
    async (values: DocumentationValues) => {
      try {
        const body = await getUploadUrls(values);
        const result = await uploadDocumentation({
          PK: application.ContactPerson.PK,
          body,
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

async function getUploadUrls(values: DocumentationValues) {
  const poiPromise = uploadIfNecessary(values.proofOfIdentity);
  const porPromise = uploadIfNecessary(values.proofOfRegistration);
  const fsPromise = Promise.all(
    values.financialStatements.map((fileWrapper) =>
      uploadIfNecessary(fileWrapper)
    )
  );
  const afrPromise = Promise.all(
    values.auditedFinancialReports.map((fileWrapper) =>
      uploadIfNecessary(fileWrapper)
    )
  );

  const [
    ProofOfIdentity,
    ProofOfRegistration,
    FinancialStatements,
    AuditedFinancialReports,
  ] = await Promise.all([poiPromise, porPromise, fsPromise, afrPromise]);

  const hasError = FinancialStatements.concat(AuditedFinancialReports)
    .concat([ProofOfIdentity, ProofOfRegistration])
    .some((x) => {
      if (!x.publicUrl) {
        logger.error(`Error occured. File ${x.name} does not have a publicUrl`);
        return true;
      }
      return false;
    });

  if (hasError) {
    throw new Error("Error uploading files ❌");
  }

  return {
    Website: values.website,
    UN_SDG: values.un_sdg,
    ProofOfIdentity,
    ProofOfRegistration,
    FinancialStatements,
    AuditedFinancialReports,
  };
}

async function uploadIfNecessary(fileWrapper: FileWrapper) {
  if (!fileWrapper.file) {
    return {
      name: fileWrapper.name,
      publicUrl: fileWrapper.publicUrl,
    };
  }

  const publicUrl = await uploadToIpfs(fileWrapper.file);

  return {
    name: fileWrapper.file.name,
    publicUrl,
  };
}
