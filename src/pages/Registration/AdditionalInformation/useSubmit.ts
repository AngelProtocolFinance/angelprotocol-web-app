import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { UpdateCharityMetadataResult } from "services/aws/types";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import uploadToIpfs from "helpers/uploadToIpfs";
import { Folders } from "constants/folders";
import { updateCharity } from "../store";
import { FormValues } from "./types";

export default function useSubmit() {
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();
  const { showModal } = useSetModal();

  const handleError = useCallback((err) => {
    showModal(Popup, {
      message: err?.data?.message || "Error updating profile ❌",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuccess = useCallback(
    (data: UpdateCharityMetadataResult) =>
      dispatch(
        updateCharity({
          ...charity,
          Metadata: {
            ...charity.Metadata,
            Banner: data.Banner,
            CharityLogo: data.CharityLogo,
            CharityOverview: data.CharityOverview,
          },
        })
      ),
    [dispatch, charity]
  );

  const submit = useCallback(
    async (values: FormValues) => {
      const body = await getUploadBody(values);
      if (!body)
        return showModal(Popup, { message: "Error uploading files ❌" });

      const result = await updateMetadata({
        PK: charity.ContactPerson.PK,
        body,
      });

      const dataResult = result as {
        data: UpdateCharityMetadataResult;
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
      updateMetadata,
      charity.ContactPerson.PK,
      handleError,
      handleSuccess,
    ]
  );

  return { submit, isSuccess };
}

async function getUploadBody(values: FormValues) {
  const logoPromise = uploadToIpfs(
    values.charityLogo,
    Folders.CharityProfileImageLogo
  );
  const bannerPromise = uploadToIpfs(
    values.banner,
    Folders.CharityProfileImageBanners
  );
  const [CharityLogo, Banner] = await Promise.all([logoPromise, bannerPromise]);

  if (!CharityLogo || !Banner) return null;

  return {
    Banner,
    CharityLogo,
    CharityOverview: values.charityOverview,
  };
}
