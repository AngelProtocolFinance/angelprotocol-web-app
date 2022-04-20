import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { UpdateDocumentationResult } from "services/aws/types";
import { useGetter, useSetter } from "store/accessors";
import uploadToIpfs from "helpers/uploadToIpfs";
import { Folders } from "constants/folders";
import { updateCharity } from "../store";
import { FormValues } from "./types";

export default function useUpload() {
  const [uploadDocumentation, { isSuccess }] = useUpdateDocumentationMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();

  // this '_' value should be used to notify the user of a failure,
  // or to put in our logs once (and if) they're ever implemented
  const handleError = useCallback((err) => console.log(err), []);

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

      const postData = { PK: charity.ContactPerson.PK, body: uploadBody };
      const result = await uploadDocumentation(postData);

      const dataResult = result as {
        data: UpdateDocumentationResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        handleError(JSON.stringify(dataResult.error));
      } else {
        handleSuccess(dataResult.data);
      }
    },
    [charity.ContactPerson.PK, handleSuccess, handleError, uploadDocumentation]
  );

  return { upload, isSuccess };
}

async function getUploadUrls(values: FormValues) {
  const poiPromise = uploadToIpfs(
    values.proofOfIdentity,
    Folders.ProofOfIdentity
  );
  const porPromise = uploadToIpfs(
    values.proofOfRegistration,
    Folders.ProofOfRegistration
  );
  const fsPromise = Promise.all(
    values.financialStatements.map((x) =>
      uploadToIpfs(x, Folders.AuditedFinancialDocs)
    )
  );
  const afrPromise = Promise.all(
    values.auditedFinancialReports.map((x) =>
      uploadToIpfs(x, Folders.AuditedFinancialDocs)
    )
  );

  const [
    ProofOfIdentity,
    ProofOfRegistration,
    FinancialStatements,
    AuditedFinancialReports,
  ] = await Promise.all([poiPromise, porPromise, fsPromise, afrPromise]);

  return {
    Website: values.website,
    UN_SDG: values.un_sdg,
    ProofOfIdentity,
    ProofOfRegistration,
    FinancialStatements,
    AuditedFinancialReports,
  };
}
