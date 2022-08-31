import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentationValues } from "pages/Registration/types";
import {
  useRegistrationState,
  useUpdateDocumentationMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { FileWrapper } from "components/FileDropzone";
import { logger, uploadToIpfs } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { appRoutes } from "constants/routes";
import { FORM_ERROR, Folders } from "../constants";
import routes from "../routes";

export default function useUpload() {
  const [uploadDocumentation] = useUpdateDocumentationMutation();
  const { charity } = useRegistrationState();
  const navigate = useNavigate();

  const { handleError } = useErrorContext();

  const upload = useCallback(
    async (values: DocumentationValues) => {
      try {
        if (!charity) {
          throw new UnexpectedStateError("Charity data is null");
        }

        const body = await getUploadUrls(charity.ContactPerson.PK!, values);
        const result = await uploadDocumentation({
          PK: charity.ContactPerson.PK,
          body,
        });

        if ("error" in result) {
          return handleError(result.error, FORM_ERROR);
        }

        navigate(`${appRoutes.register}/${routes.additionalInformation}`);
      } catch (error) {
        handleError(error, FORM_ERROR);
      }
    },
    [charity, handleError, uploadDocumentation, navigate]
  );

  return upload;
}

async function getUploadUrls(primaryKey: string, values: DocumentationValues) {
  const poiPromise = uploadIfNecessary(
    primaryKey,
    values.proofOfIdentity,
    Folders.ProofOfIdentity
  );
  const porPromise = uploadIfNecessary(
    primaryKey,
    values.proofOfRegistration,
    Folders.ProofOfRegistration
  );
  const fsPromise = Promise.all(
    values.financialStatements.map((fileWrapper) =>
      uploadIfNecessary(primaryKey, fileWrapper, Folders.FinancialStatements)
    )
  );
  const afrPromise = Promise.all(
    values.auditedFinancialReports.map((fileWrapper) =>
      uploadIfNecessary(
        primaryKey,
        fileWrapper,
        Folders.AuditedFinancialReports
      )
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

async function uploadIfNecessary(
  primaryKey: string,
  fileWrapper: FileWrapper,
  folder: Folders
) {
  if (!fileWrapper.file) {
    return {
      name: fileWrapper.name,
      publicUrl: fileWrapper.publicUrl,
    };
  }

  const path = `${folder}/${primaryKey}-${fileWrapper.name}`;
  const publicUrl = await uploadToIpfs(path, fileWrapper.file);

  return {
    name: fileWrapper.file.name,
    publicUrl,
  };
}
