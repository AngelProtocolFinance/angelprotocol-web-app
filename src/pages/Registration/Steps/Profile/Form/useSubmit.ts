import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { FileObject } from "types/aws";
import { useUpdateMetadataMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { ImgLink } from "components/ImgEditor";
import { uploadToIpfs } from "helpers";

export default function useSubmit() {
  const { handleSubmit } = useFormContext<FV>();
  const [updateMetadata] = useUpdateMetadataMutation();
  const { handleError } = useErrorContext();

  const submit = async ({ overview, ref, ...imgs }: FV) => {
    try {
      const previews = await getFilePreviews({ ...imgs });

      const result = await updateMetadata({
        PK: ref,
        body: {
          Banner: previews.banner,
          Logo: previews.logo,
          Overview: overview,
          KycDonorsOnly: false /**TODO: isKYC part of metaData */,
        },
      });

      if ("error" in result) {
        return handleError(result.error, "Error updating profile ❌");
      }
    } catch (error) {
      handleError(error, "Error updating profile ❌");
    }
  };

  return handleSubmit(submit);
}

async function getFilePreviews<T extends { [index: string]: ImgLink }>(
  fields: T
): Promise<{ [key in keyof T]: FileObject }> {
  const idxes: { [index: string]: number } = {};
  let files: File[] = [];

  let pos = 0;
  for (const [key, imgLink] of Object.entries(fields)) {
    if (imgLink.file) {
      idxes[key] = pos;
      files.push(imgLink.file);
      pos++;
    } else {
      continue;
    }
  }
  const urls = await uploadToIpfs(files);
  //map file names to urls
  const previews: FileObject[] = files.map(({ name }, i) => ({
    name,
    publicUrl: urls[i],
  }));

  //rebuild object with preview urls
  const result: any = {};
  for (const [key, idx] of Object.entries(idxes)) {
    const _preview = previews.slice(idx, idx + 1);
    //return previous previews if no new urls
    if (_preview.length <= 0) {
      const { name, publicUrl } = fields[key];
      result[key] = { name, publicUrl };
    } else {
      result[key] = previews[idx];
    }
  }

  return result;
}
