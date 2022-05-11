import { useCallback } from "react";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { UpdateDocumentationResult } from "services/aws/types";
import { FileWrapper } from "components/FileDropzone/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { Folders } from "../constants";
import { uploadToIpfs } from "../helpers";
import { updateCharity } from "../store";
import { FormValues } from "./types";

export default function useUpload() {
  const [uploadDocumentation, { isSuccess }] = useUpdateDocumentationMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error, message) => {
      console.log(error);
      showModal(Popup, { message });
    },
    [showModal]
  );

  const handleSuccess = useCallback(
    (data?: UpdateDocumentationResult) =>
      dispatch(
        updateCharity({
          ...charity,
          Registration: { ...charity.Registration, ...data },
        })
      ),
    [dispatch, charity]
  );

  const upload = useCallback(
    async (values: FormValues) => {
      try {
        const uploadBody = await getUploadUrls(values);

        const postData = { PK: charity.ContactPerson.PK, body: uploadBody };
        const result = await uploadDocumentation(postData);

        if ("error" in result) {
          handleError(result.error, "Error updating charity ❌");
        } else {
          handleSuccess(result.data);
        }
      } catch (error) {
        handleError(error, "Error updating charity ❌");
      }
    },
    [
      showModal,
      charity.ContactPerson.PK,
      uploadDocumentation,
      handleError,
      handleSuccess,
    ]
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

  if (hasError) throw new Error("Error uploading files ❌");

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
