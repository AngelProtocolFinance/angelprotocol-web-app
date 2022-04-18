import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { FileObject, UpdateCharityMetadataResult } from "services/aws/types";
import { FileWrapper } from "components/FileDropzone/types";
import { useGetter, useSetter } from "store/accessors";
import { updateUser } from "../store";
import { FormValues } from "./types";

export default function useSubmit() {
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const user = useGetter((state) => state.user);
  const dispatch = useSetter();

  const handleError = useCallback((err) => console.log(err), []);

  const handleSuccess = useCallback(
    (data: UpdateCharityMetadataResult) => {
      dispatch(
        updateUser({
          ...user,
          Metadata: {
            ...user.Metadata,
            Banner: data.Banner,
            CharityLogo: data.CharityLogo,
            CharityOverview: data.CharityOverview,
          },
        })
      );
    },
    [dispatch, user]
  );

  const submit = useCallback(
    async (values: FormValues) => {
      const body = await getUploadBody(values);

      const result = await updateMetadata({ PK: user.ContactPerson.PK, body });

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
    [user.ContactPerson.PK, handleSuccess, handleError, updateMetadata]
  );

  return { submit, isSuccess };
}

async function getUploadBody(values: FormValues) {
  const CharityLogo = await readFileToDataUrl(values.charityLogo);
  const Banner = await readFileToDataUrl(values.banner);

  return {
    Banner,
    CharityLogo,
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
