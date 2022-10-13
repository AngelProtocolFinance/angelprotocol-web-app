import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdditionalInfoValues } from "pages/Registration/types";
import { FileObject } from "types/aws";
import {
  useRegistrationQuery,
  useUpdateCharityMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { ImgLink } from "components/ImgEditor";
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
  const logoPromise = uploadIfNecessary(values.charityLogo);
  const bannerPromise = uploadIfNecessary(values.banner);
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

async function uploadIfNecessary({
  file,
  ...link
}: ImgLink): Promise<FileObject> {
  if (!file) {
    return link;
  }

  return {
    name: file.name,
    publicUrl: await uploadToIpfs(file),
  };
}
