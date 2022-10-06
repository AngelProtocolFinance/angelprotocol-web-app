import { AdditionalInfoValues } from "../types";
import { FileObject, Metadata } from "types/aws";
import { FileWrapper } from "components/FileDropzone";
import { uploadToIpfs } from "helpers";

type UploadBody = Pick<
  Metadata,
  "Banner" | "Logo" | "Overview" | "KycDonorsOnly"
>;

export default async function getUploadBody(
  values: AdditionalInfoValues
): Promise<UploadBody> {
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
    Overview: values.overview,
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
