import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdditionalInfoValues } from "pages/Registration/types";
import { FileObject } from "types/aws";
import {
  useRegistrationQuery,
  useUpdateMetadataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { ImgLink } from "components/ImgEditor";
import { uploadToIpfs } from "helpers";
import { appRoutes } from "constants/routes";
import routes from "../../routes";

export default function useSubmit() {
  const [updateMetadata] = useUpdateMetadataMutation();
  const { application } = useRegistrationQuery();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit = useCallback(
    async ({
      charityOverview,
      kycDonorsOnly,
      ...imgs
    }: AdditionalInfoValues) => {
      try {
        const previews = await getFilePreviews({ ...imgs });

        const result = await updateMetadata({
          PK: application.ContactPerson.PK,
          body: {
            Banner: previews.banner,
            Logo: previews.charityLogo,
            Overview: charityOverview,
            KycDonorsOnly: kycDonorsOnly,
          },
        });

        if ("error" in result) {
          return handleError(result.error, "Error updating profile ❌");
        }

        const route = application.Metadata.JunoWallet
          ? routes.dashboard
          : routes.wallet;
        navigate(`${appRoutes.register}/${route}`);
      } catch (error) {
        handleError(error, "Error updating profile ❌");
      }
    },
    [application, handleError, updateMetadata, navigate]
  );

  return { submit };
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
