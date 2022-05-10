import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { DocumentationValues } from "@types-page/registration";
import { UpdateDocumentationResult } from "@types-server/aws";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { Folders } from "constants/folders";
import { uploadToIpfs } from "../helpers";
import { updateCharity } from "../store";

export default function useUpload() {
  const [uploadDocumentation, { isSuccess }] = useUpdateDocumentationMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (err) => {
      showModal(Popup, {
        message: err?.data?.message || "Error updating profile ❌",
      });
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
    async (values: DocumentationValues) => {
      const uploadBody = await getUploadUrls(values);

      if (!uploadBody)
        return showModal(Popup, {
          message: "Error uploading files ❌",
        });

      const postData = { PK: charity.ContactPerson.PK, body: uploadBody };
      const result = await uploadDocumentation(postData);

      const dataResult = result as {
        data: UpdateDocumentationResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        handleError(dataResult.error);
      } else {
        handleSuccess(dataResult.data);
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

async function getUploadUrls(values: DocumentationValues) {
  const poiPromise = uploadToIpfs(
    values.proofOfIdentity.file,
    Folders.ProofOfIdentity
  );
  const porPromise = uploadToIpfs(
    values.proofOfRegistration.file,
    Folders.ProofOfRegistration
  );
  const fsPromise = Promise.all(
    values.financialStatements.map((x) =>
      uploadToIpfs(x.file, Folders.AuditedFinancialDocs)
    )
  );
  const afrPromise = Promise.all(
    values.auditedFinancialReports.map((x) =>
      uploadToIpfs(x.file, Folders.AuditedFinancialDocs)
    )
  );

  const [
    ProofOfIdentity,
    ProofOfRegistration,
    FinancialStatements,
    AuditedFinancialReports,
  ] = await Promise.all([poiPromise, porPromise, fsPromise, afrPromise]);

  const hasError = FinancialStatements.concat(AuditedFinancialReports).some(
    (x) => !x.publicUrl
  );
  if (!ProofOfIdentity.publicUrl || !ProofOfRegistration.publicUrl || hasError)
    return null;

  return {
    Website: values.website,
    UN_SDG: values.un_sdg,
    ProofOfIdentity,
    ProofOfRegistration,
    FinancialStatements,
    AuditedFinancialReports,
  };
}
