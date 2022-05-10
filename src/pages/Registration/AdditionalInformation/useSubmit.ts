import { useCallback } from "react";
import { AdditionalInfoValues } from "@types-page/registration";
import { UpdateCharityMetadataResult } from "@types-server/aws";
import { Result } from "@types-utils";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { Folders } from "constants/folders";
import { uploadToIpfs } from "../helpers";
import { updateCharity } from "../store";

export default function useSubmit() {
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
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
    async (values: AdditionalInfoValues) => {
      const body = await getUploadBody(values);
      if (!body)
        return showModal(Popup, { message: "Error uploading files ❌" });

      const result = await updateMetadata({
        PK: charity.ContactPerson.PK,
        body,
      });

      const dataResult = result as Result<UpdateCharityMetadataResult>;

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

async function getUploadBody(values: AdditionalInfoValues) {
  const logoPromise = uploadToIpfs(
    values.charityLogo.file,
    Folders.CharityProfileImageLogo
  );
  const bannerPromise = uploadToIpfs(
    values.banner.file,
    Folders.CharityProfileImageBanners
  );
  const [CharityLogo, Banner] = await Promise.all([logoPromise, bannerPromise]);

  if (!CharityLogo.publicUrl || !Banner.publicUrl) return null;

  return {
    Banner,
    CharityLogo,
    CharityOverview: values.charityOverview,
  };
}
