import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { FileWrapper } from "components/FileDropzone/types";
import { useCallback } from "react";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { FileObject, UpdateDocumentationResult } from "services/aws/types";
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
  const poiPromise = Promise.all(
    values.proofOfIdentity.map((x) => readFileToDataUrl(x))
  );
  const porPromise = Promise.all(
    values.proofOfRegistration.map((x) => readFileToDataUrl(x))
  );
  const fsPromise = Promise.all(
    values.financialStatements.map((x) => readFileToDataUrl(x))
  );
  const afrPromise = Promise.all(
    values.auditedFinancialReports.map((x) => readFileToDataUrl(x))
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

const readFileToDataUrl = (fileWrapper: FileWrapper) =>
  new Promise<FileObject>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = (error) => reject(error);
    reader.onload = (e: ProgressEvent<FileReader>) =>
      resolve({
        name: fileWrapper.name,
        dataUrl: e.target!.result as string,
        sourceUrl: fileWrapper.sourceUrl,
      });

    reader.readAsDataURL(fileWrapper.file as Blob);
  });
