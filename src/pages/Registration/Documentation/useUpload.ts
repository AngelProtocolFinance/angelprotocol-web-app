import { useCallback } from "react";
import { useUpdateDocumentationMutation } from "services/aws/registration";
import { UpdateDocumentationResult } from "services/aws/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { FormValues } from "./types";

export default function useUpload() {
  const [uploadDocumentation, result] = useUpdateDocumentationMutation();
  const { isSuccess, isError, isLoading, data, error } = result;
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

  const uploadDocuments = useCallback(
    async (values: FormValues) => {
      const uploadBody = await getUploadBody(values);
      const postData = { PK: user.PK, body: uploadBody };

      await uploadDocumentation(postData);

      if (isError) {
        handleError(JSON.stringify(error));
      } else {
        handleSuccess(data);
      }
    },
    [handleSuccess, handleError]
  );

  return { uploadDocuments, isSuccess, isLoading };
}

async function getUploadBody(values: FormValues) {
  const ProofOfIdentity = await readFileToDataUrl(values.proofOfIdentity);
  const ProofOfRegistration = await readFileToDataUrl(
    values.proofOfRegistration
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
