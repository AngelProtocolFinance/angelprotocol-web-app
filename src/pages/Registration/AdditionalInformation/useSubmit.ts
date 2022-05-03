import { useCallback } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { FileWrapper } from "components/FileDropzone/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { Folders } from "../constants";
import { uploadToIpfs } from "../helpers";
import { updateCharity } from "../store";
import { FormValues } from "./types";

export default function useSubmit() {
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error) => {
      console.log(error);
      showModal(Popup, { message: "Error updating profile ❌" });
    },
    [showModal]
  );

  const submit = useCallback(
    async (values: FormValues) => {
      try {
        const body = await getUploadBody(values);

        const result = await updateMetadata({
          PK: charity.ContactPerson.PK,
          body,
        });

        if ("error" in result) {
          handleError(result.error);
        } else {
          const { TerraWallet, ...resultMetadata } = result.data;
          dispatch(
            updateCharity({
              ...charity,
              Metadata: {
                ...charity.Metadata,
                ...resultMetadata,
              },
            })
          );
        }
      } catch (error) {
        handleError(error);
      }
    },
    [charity, dispatch, handleError, updateMetadata]
  );

  return { submit, isSuccess };
}

async function getUploadBody(values: FormValues) {
  const logoPromise = uploadIfNecessary(
    values.charityLogo,
    Folders.CharityProfileImageLogo
  );
  const bannerPromise = uploadIfNecessary(
    values.banner,
    Folders.CharityProfileImageBanners
  );
  const [CharityLogo, Banner] = await Promise.all([logoPromise, bannerPromise]);

  if (!CharityLogo.publicUrl || !Banner.publicUrl) {
    throw new Error(
      `Error uploading file ${
        !CharityLogo.publicUrl ? values.charityLogo.name : values.banner.name
      }`
    );
  }

  return {
    Banner,
    CharityLogo,
    CharityOverview: values.charityOverview,
  };
}

async function uploadIfNecessary(fileWrapper: FileWrapper, folder: Folders) {
  if (!fileWrapper.file) {
    return {
      name: fileWrapper.name,
      publicUrl: fileWrapper.publicUrl,
    };
  }

  const result = await uploadToIpfs(fileWrapper.file, folder);

  return {
    name: fileWrapper.file.name,
    publicUrl: result.publicUrl,
  };
}
