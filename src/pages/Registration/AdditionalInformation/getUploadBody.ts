import { AdditionalInfoValues } from "../types";
import { FileObject, Metadata } from "types/aws";
import { ImgLink } from "components/ImgEditor";
import { uploadToIpfs } from "helpers";

type UploadBody = Pick<
  Metadata,
  "Banner" | "Logo" | "Overview" | "KycDonorsOnly"
>;

export default async function getUploadBody(
  values: AdditionalInfoValues
): Promise<UploadBody> {
  const logoPromise = uploadIfNecessary(values.charityLogo);
  const bannerPromise = uploadIfNecessary(values.banner);
  const [Logo, Banner] = await Promise.all([logoPromise, bannerPromise]);

  if (!Logo.publicUrl || !Banner.publicUrl) {
    throw new Error(
      `Error uploading file ${
        !Logo.publicUrl ? values.charityLogo.name : values.banner.name
      }`
    );
  }

  return {
    Banner,
    Logo,
    Overview: values.charityOverview,
    KycDonorsOnly: values.kycDonorsOnly,
  };
}

async function uploadIfNecessary({
  file,
  preview,
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
