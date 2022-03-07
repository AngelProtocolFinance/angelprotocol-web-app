import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { UpdateDocumentationResult } from "services/aws/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { FormValues } from "./types";

export default function useUpload() {
  const [uploadDocumentation, { isSuccess }] = useUpdateDocumentationMutation();
  const user = useGetter((state) => state.user);
  const dispatch = useSetter();

  // this '_' value should be used to notify the user of a failure,
  // or to put in our logs once (and if) they're ever implemented
  const handleError = useCallback((err) => console.log(err), []);

  const handleSuccess = useCallback(
    (data?: UpdateDocumentationResult) => {
      const userData = { ...user, ...data };
      dispatch(updateUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    [dispatch, user]
  );

  const upload = useCallback(
    async (values: FormValues) => {
      const uploadBody = await getUploadBody(values);
      const postData = { PK: user.PK, body: uploadBody };

      const result = await uploadDocumentation(postData);

      const dataResult = result as {
        data: UpdateDocumentationResult;
        error: FetchBaseQueryError | SerializedError;
      };
      console.log(dataResult);

      if (dataResult.error) {
        handleError(JSON.stringify(dataResult.error));
      } else {
        handleSuccess(dataResult.data);
      }
    },
    [user.PK, handleSuccess, handleError, uploadDocumentation]
  );

  return { upload, isSuccess };
}

async function getUploadBody(values: FormValues) {
  const ProofOfIdentity = await Promise.all(
    values.proofOfIdentity.map((x) => readFileToDataUrl(x))
  );
  const ProofOfRegistration = await Promise.all(
    values.proofOfRegistration.map((x) => readFileToDataUrl(x))
  );
  const FinancialStatements = await Promise.all(
    values.financialStatements.map((x) => readFileToDataUrl(x))
  );
  const AuditedFinancialReports = await Promise.all(
    values.auditedFinancialReports.map((x) => readFileToDataUrl(x))
  );

  return {
    Website: values.website,
    UN_SDG: values.un_sdg,
    ProofOfIdentity,
    ProofOfRegistration,
    FinancialStatements,
    AuditedFinancialReports,
  };
}

type DocumentObject = { name: string; dataUrl: string };

const readFileToDataUrl = (file: File) =>
  new Promise<DocumentObject>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = (error) => reject(error);
    reader.onload = (e: ProgressEvent<FileReader>) =>
      resolve({
        name: file.name,
        dataUrl: e.target!.result as string,
      });

    reader.readAsDataURL(file as Blob);
  });
