import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdditionalInfoValues } from "pages/Registration/types";
import { FileObject } from "types/aws";
import {
  useRegistrationQuery,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { FileWrapper } from "components/FileDropzone";
import { uploadToIpfs } from "helpers";
import { appRoutes } from "constants/routes";
import routes from "../routes";

export default function useSubmit() {
  const [updateMetadata] = useUpdateCharityMetadataMutation();
  const { charity } = useRegistrationQuery();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit = useCallback(
    async (values: AdditionalInfoValues) => {
      try {
        const body = await getUploadBody(values);

        const result = await updateMetadata({
          PK: charity.ContactPerson.PK,
          body,
        });

        if ("error" in result) {
          return handleError(result.error, "Error updating profile ❌");
        }

        const route = charity.Metadata.JunoWallet
          ? routes.dashboard
          : routes.wallet;
        navigate(`${appRoutes.register}/${route}`);
      } catch (error) {
        handleError(error, "Error updating profile ❌");
      }
    },
    [charity, handleError, updateMetadata, navigate]
  );

  return { submit };
}

async function getUploadBody(values: AdditionalInfoValues) {
  const logoPromise = uploadIfNecessary(values.logo);
  const bannerPromise = uploadIfNecessary(values.banner);
  const [Logo, Banner] = await Promise.all([logoPromise, bannerPromise]);

  if (!Logo.publicUrl || !Banner.publicUrl) {
    throw new Error(
      `Error uploading file ${
        !Logo.publicUrl ? values.logo.name : values.banner.name
      }`
    );
  }

  return {
    Banner,
    Logo,
    CharityOverview: values.charityOverview,
    KycDonorsOnly: values.kycDonorsOnly,
  };
}

async function uploadIfNecessary(
  fileWrapper: FileWrapper
): Promise<FileObject> {
  if (!fileWrapper.file) {
    return {
      name: fileWrapper.name,
      publicUrl: fileWrapper.publicUrl,
    };
  }

  const publicUrl = await uploadToIpfs(fileWrapper.file);

  return {
    name: fileWrapper.file.name,
    publicUrl,
  };
}
