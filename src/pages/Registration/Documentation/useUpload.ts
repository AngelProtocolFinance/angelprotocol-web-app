import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { UpdateDocumentationResult } from "services/aws/types";
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
    async (values: FormValues) => {
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

async function getUploadUrls(values: FormValues) {
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
      uploadToIpfs(x.file, Folders.FinancialStatements)
    )
  );
  const afrPromise = Promise.all(
    values.auditedFinancialReports.map((x) =>
      uploadToIpfs(x.file, Folders.AuditedFinancialReports)
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
