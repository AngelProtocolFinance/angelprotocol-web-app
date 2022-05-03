import { useCallback } from "react";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { FileWrapper } from "components/FileDropzone/types";
import { useGetter, useSetter } from "store/accessors";
import { Folders } from "../constants";
import { uploadToIpfs } from "../helpers";
import { updateCharity } from "../store";
import useHandleError from "../useHandleError";
import { FormValues } from "./types";

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useUpload() {
  const [uploadDocumentation, { isSuccess }] = useUpdateDocumentationMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();
  const handleError = useHandleError();

  const upload = useCallback(
    async (values: FormValues) => {
      try {
        const body = await getUploadUrls(values);

        const result = await uploadDocumentation({
          PK: charity.ContactPerson.PK,
          body,
        });

        if ("error" in result) {
          handleError(result.error, FORM_ERROR);
        } else {
          dispatch(
            updateCharity({
              ...charity,
              Registration: { ...charity.Registration, ...result.data },
            })
          );
        }
      } catch (error) {
        handleError(error, FORM_ERROR);
      }
    },
    [charity, dispatch, handleError, uploadDocumentation]
  );

  return { upload, isSuccess };
}

async function getUploadUrls(values: FormValues) {
  const poiPromise = uploadIfNecessary(
    values.proofOfIdentity,
    Folders.ProofOfIdentity
  );
  const porPromise = uploadIfNecessary(
    values.proofOfRegistration,
    Folders.ProofOfRegistration
  );
  const fsPromise = Promise.all(
    values.financialStatements.map((x) =>
      uploadIfNecessary(x, Folders.FinancialStatements)
    )
  );
  const afrPromise = Promise.all(
    values.auditedFinancialReports.map((x) =>
      uploadIfNecessary(x, Folders.AuditedFinancialReports)
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

async function uploadIfNecessary(fileWrapper: FileWrapper, folder: Folders) {
  if (!fileWrapper.file) {
    return {
      name: fileWrapper.name,
      publicUrl: fileWrapper.publicUrl,
    };
  }

  const result = await uploadToIpfs(fileWrapper.file, folder);

  return {
    name: fileWrapper.file.name,
    publicUrl: result.publicUrl,
  };
}
