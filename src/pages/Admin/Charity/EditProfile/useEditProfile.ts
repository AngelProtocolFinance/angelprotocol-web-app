import { useFormContext } from "react-hook-form";
import { ProfileFormValues, ProfileUpdate } from "pages/Admin/types";
import { ObjectEntries } from "types/utils";
import { useAdminResources } from "pages/Admin/Guard";
import { useUpdateProfileMutation } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import Contract from "contracts/Contract";
import { cleanObject, getPayloadDiff } from "helpers/admin";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";

// import optimizeImage from "./optimizeImage";

const PLACEHOLDER_OVERVIEW = "[text]";

export default function useEditProfile() {
  const { endowmentId } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ProfileFormValues>();

  const { wallet } = useGetWallet();
  const { handleError } = useErrorContext();

  const [update] = useUpdateProfileMutation();

  const editProfile = async ({ initial, ...data }: ProfileFormValues) => {
    try {
      const [bannerUrl, logoUrl] = await getImgUrls([data.image, data.logo]);
      //flatten profile values for diffing
      //TODO: refactor to diff nested objects
      const flatData: ProfileUpdate = {
        ...data,
        hq_country: data.hq_country.name,
        image: bannerUrl,
        logo: logoUrl,
      };

      const diff = getPayloadDiff(initial, flatData);

      //if overview has changed, and is set to something
      if ("overview" in diff && flatData.overview) {
        //truncate to reduce proposalMsg size
        diff.overview = PLACEHOLDER_OVERVIEW;
      }

      const diffEntries = Object.entries(diff) as ObjectEntries<ProfileUpdate>;
      if (diffEntries.length <= 0) {
        throw new Error("no changes detected");
      }

      //TODO: add logo upload

      const contract = new Contract(wallet);
      //don't pass just diff here, old value should be included for null will be set if it's not present in payload

      const msgSignData = await contract.createMsgSignData(
        cleanObject({ ...flatData })
      );

      const res = await update(msgSignData);

      if ("error" in res) {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      handleError(err);
    }
  };

  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
    id: endowmentId,
  };
}

async function getImgUrls(imgs: ImgLink[]): Promise<string[]> {
  const files = imgs.flatMap((img) => (img.file ? [img.file] : []));
  const cid = await uploadToIpfs(files);
  return imgs.map((img) =>
    img.file && cid ? genPublicUrl(cid, img.file.name) : img.publicUrl
  );
}
