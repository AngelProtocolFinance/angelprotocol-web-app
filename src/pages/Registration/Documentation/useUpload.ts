import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentationValues } from "pages/Registration/types";
import {
  useRegistrationState,
  useUpdateDocumentationMutation,
} from "services/aws/registration";
import { FileWrapper } from "components/FileDropzone";
import { appRoutes, siteRoutes } from "constants/routes";
import { FORM_ERROR, Folders } from "../constants";
import { uploadToIpfs } from "../helpers";
import routes from "../routes";
import useHandleError from "../useHandleError";

export default function useUpload() {
  const [uploadDocumentation] = useUpdateDocumentationMutation();
  const { data } = useRegistrationState("");
  const charity = data!; //ensured by guard
  const navigate = useNavigate();

  const handleError = useHandleError();

  const upload = useCallback(
    async (values: DocumentationValues) => {
      try {
        const body = await getUploadUrls(charity.ContactPerson.PK!, values);
        const result = await uploadDocumentation({
          PK: charity.ContactPerson.PK,
          body,
        });

        if ("error" in result) {
          handleError(result.error, FORM_ERROR);
        }

        navigate(
          `${siteRoutes.index}/${appRoutes.register}/${routes.dashboard}`
        );
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
        console.log(`Error occured. File ${x.name} does not have a publicUrl`);
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
