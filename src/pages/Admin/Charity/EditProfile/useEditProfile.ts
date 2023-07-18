import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues as FV, FlatFormValues } from "./types";
import { ProfileUpdateMsg } from "services/types";
import { useModalContext } from "contexts/ModalContext";
import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { useAdminContext } from "../../Context";
import useUpdateEndowmentProfile from "../common/useUpdateEndowmentProfile";
import { ops } from "./ops";

export default function useEditProfile() {
  const { id, owner } = useAdminContext<"charity">(ops);
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const updateProfile = useUpdateEndowmentProfile();

  const editProfile: SubmitHandler<FV> = async ({
    initial,
    image,
    logo,
    hq_country,
    categories_sdgs,
    active_in_countries,
    endow_designation,
    type,
    ...newData
  }) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useTxSender
       */

      const [bannerUrl, logoUrl] = await uploadImgs([image, logo], () => {
        showModal(
          TxPrompt,
          { loading: "Uploading images.." },
          { isDismissible: false }
        );
      });

      const changes: FlatFormValues = {
        image: bannerUrl,
        logo: logoUrl,
        hq_country: hq_country.name,
        endow_designation: endow_designation.value,
        categories_sdgs: categories_sdgs.map((opt) => opt.value),
        active_in_countries: active_in_countries.map((opt) => opt.value),
        ...newData,
      };

      const diff = getPayloadDiff(initial, changes);

      if (Object.entries(diff).length <= 0) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      /** already clean - no need to futher clean "": to unset values { field: val }, field must have a value 
     like ""; unlike contracts where if fields is not present, val is set to null.
    */
      const updates: ProfileUpdateMsg = {
        ...changes,
        id,
        owner,
      };

      await updateProfile(updates);
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
    type: getValues("type"),
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
