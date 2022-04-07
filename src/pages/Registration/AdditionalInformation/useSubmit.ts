import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useUpdateAdditionalInformationMutation } from "services/aws/registration";
import {
  DocumentObject,
  UpdateAdditionalInformationResult,
} from "services/aws/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { FormValues } from "./types";

export default function useSubmit() {
  const [uploadAdditionalInfo, { isSuccess }] =
    useUpdateAdditionalInformationMutation();
  const user = useGetter((state) => state.user);
  const dispatch = useSetter();

  const handleError = useCallback((err) => console.log(err), []);

  const handleSuccess = useCallback(
    (data?: UpdateAdditionalInformationResult) => {
      const userData = { ...user, ...data };
      dispatch(updateUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    [dispatch, user]
  );

  const submit = useCallback(
    async (values: FormValues) => {
      const uploadBody = await getUploadBody(values);
      const postData = { PK: user.PK, body: uploadBody };
      const result = await uploadAdditionalInfo(postData);

      const dataResult = result as {
        data: UpdateAdditionalInformationResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        handleError(JSON.stringify(dataResult.error));
      } else {
        handleSuccess(dataResult.data);
      }
    },
    [user.PK, handleSuccess, handleError, uploadAdditionalInfo]
  );

  return { submit, isSuccess };
}

async function getUploadBody(values: FormValues) {
  const CharityLogo = await readFileToDataUrl(values.charityLogo[0]);
  const CharityBanner = await readFileToDataUrl(values.charityBanner[0]);

  return {
    CharityLogo,
    CharityBanner,
    CharityOverview: values.charityOverview,
  };
}

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
