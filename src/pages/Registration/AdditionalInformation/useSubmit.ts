import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdditionalInfoValues } from "pages/Registration/types";
import {
  useRegistrationQuery,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { FileWrapper } from "components/FileDropzone";
import { uploadToIpfs } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { appRoutes } from "constants/routes";
import { Folders } from "../constants";
import routes from "../routes";

export default function useSubmit() {
  const [updateMetadata] = useUpdateCharityMetadataMutation();
  const { data: charity } = useRegistrationQuery("");
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit = useCallback(
    async (values: AdditionalInfoValues) => {
      try {
        if (!charity) {
          throw new UnexpectedStateError("Charity data is null");
        }

        const body = await getUploadBody(charity.ContactPerson.PK!, values);

        const result = await updateMetadata({
          PK: charity.ContactPerson.PK,
          body,
        });

        if ("error" in result) {
          handleError(result.error, "Error updating profile ❌");
        }
        navigate(`${appRoutes.register}/${routes.wallet}`);
      } catch (error) {
        handleError(error, "Error updating profile ❌");
      }
    },
    [charity, handleError, updateMetadata, navigate]
  );

  return { submit };
}

async function getUploadBody(primaryKey: string, values: AdditionalInfoValues) {
  const logoPromise = uploadIfNecessary(
    primaryKey,
    values.charityLogo,
    Folders.CharityProfileImageLogo
  );
  const bannerPromise = uploadIfNecessary(
    primaryKey,
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
    KycDonorsOnly: values.kycDonorsOnly,
  };
}

async function uploadIfNecessary(
  primaryKey: string,
  fileWrapper: FileWrapper,
  folder: Folders
) {
  if (!fileWrapper.file) {
    return {
      name: fileWrapper.name,
      publicUrl: fileWrapper.publicUrl,
    };
  }

  const path = `${folder}/${primaryKey}-${fileWrapper.name}`;
  const publicUrl = await uploadToIpfs(path, fileWrapper.file);

  return {
    name: fileWrapper.file.name,
    publicUrl,
  };
}
