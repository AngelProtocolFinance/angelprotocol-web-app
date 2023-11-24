import { SubmitHandler, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { ProfileUpdateMsg } from "services/types";
import { useModalContext } from "contexts/ModalContext";
import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { useAdminContext } from "../../Context";
import { useUpdateEndowmentProfile } from "../common";
import { toProfileUpdate } from "./update";

export default function useEditProfile() {
  const { id } = useAdminContext();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const updateProfile = useUpdateEndowmentProfile();

  const editProfile: SubmitHandler<FV> = async ({ initial, ...fv }) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useTxSender
       */

      const [bannerUrl, logoUrl] = await uploadImgs([fv.image, fv.logo], () => {
        showModal(
          TxPrompt,
          { loading: "Uploading images.." },
          { isDismissible: false }
        );
      });

      const update = toProfileUpdate({
        type: "final",
        data: { ...fv, id },
        urls: { image: bannerUrl, logo: logoUrl },
      });

      const diffs = getPayloadDiff(initial, update);

      if (Object.entries(diffs).length <= 0) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      //only include top level keys that appeared on diff
      const cleanUpdate = diffs.reduce<ProfileUpdateMsg>(
        (result, [path]) => {
          const key = path.split(".")[0] as keyof ProfileUpdateMsg;
          return { ...result, [key]: update[key] };
        },
        { id }
      );

      await updateProfile(cleanUpdate);
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return {
    reset,
    editProfile: handleSubmit(editProfile),
    isSubmitting,
    id,
  };
}

async function uploadImgs(
  imgs: ImgLink[],
  onUpload: () => void
): Promise<string[]> {
  const files = imgs.flatMap((img) => (img.file ? [img.file] : []));
  if (!isEmpty(files)) onUpload();
  const baseURL = await uploadFiles(files, "endow-profiles");
  return imgs.map((img) =>
    img.file && baseURL ? getFullURL(baseURL, img.file.name) : img.publicUrl
  );
}
