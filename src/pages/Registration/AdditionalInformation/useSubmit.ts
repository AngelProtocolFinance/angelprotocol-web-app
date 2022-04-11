import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { FileWrapper } from "components/FileDropzone/types";
import { useCallback } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { FileObject, UpdateCharityMetadataResult } from "services/aws/types";
import { User } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { FormValues } from "./types";

export default function useSubmit() {
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const user = useGetter((state) => state.user);
  const dispatch = useSetter();

  const handleError = useCallback((err) => console.log(err), []);

  const handleSuccess = useCallback(
    (data: UpdateCharityMetadataResult) => {
      const userData: User = {
        ...user,
        Metadata: {
          ...user.Metadata,
          CharityBanner: data.CharityBanner,
          CharityLogo: data.CharityLogo,
          CharityOverview: data.CharityOverview,
        },
      };
      dispatch(updateUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    [dispatch, user]
  );

  const submit = useCallback(
    async (values: FormValues) => {
      const uploadBody = await getUploadBody(values);
      const postData = { PK: user.PK, body: uploadBody };
      const result = await updateMetadata(postData);

      const dataResult = result as {
        data: UpdateCharityMetadataResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        handleError(JSON.stringify(dataResult.error));
      } else {
        handleSuccess(dataResult.data);
      }
    },
    [user.PK, handleSuccess, handleError, updateMetadata]
  );

  return { submit, isSuccess };
}

async function getUploadBody(values: FormValues) {
  const charityLogoPromise = Promise.all(
    values.charityLogo.map((x) => readFileToDataUrl(x))
  );
  const charityBannerPromise = Promise.all(
    values.charityBanner.map((x) => readFileToDataUrl(x))
  );

  const [CharityLogo, CharityBanner] = await Promise.all([
    charityLogoPromise,
    charityBannerPromise,
  ]);

  return {
    CharityLogo,
    CharityBanner,
    CharityOverview: values.charityOverview,
  };
}

const readFileToDataUrl = (fileWrapper: FileWrapper) =>
  new Promise<FileObject>((resolve, reject) => {
    if (!fileWrapper.file) {
      return resolve({
        name: fileWrapper.name,
        sourceUrl: fileWrapper.sourceUrl,
      });
    }

    const reader = new FileReader();
    reader.onerror = (error) => reject(error);
    reader.onload = (e: ProgressEvent<FileReader>) =>
      resolve({
        name: fileWrapper.name,
        dataUrl: e.target!.result as string,
      });
    reader.readAsDataURL(fileWrapper.file as Blob);
  });
