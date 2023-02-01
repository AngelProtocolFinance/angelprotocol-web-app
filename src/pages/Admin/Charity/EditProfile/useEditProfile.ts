import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues as FV, FlatFormValues } from "./types";
import { EndowmentProfileUpdate } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useEditProfileMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { appRoutes } from "constants/routes";
import { createADR36Payload } from "./createADR36Payload";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { id, cw3 } = useAdminResources<"charity">();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const { wallet } = useGetWallet();
  const [submit] = useEditProfileMutation();

  const editProfile: SubmitHandler<FV> = async ({
    initial,
    image,
    logo,
    hq_country,
    categories_sdgs,
    ...newData
  }) => {
    try {
      const [bannerUrl, logoUrl] = await uploadImgs([image, logo], () => {
        showModal(TxPrompt, { loading: "Uploading images.." });
      });

      const changes: FlatFormValues = {
        image: bannerUrl,
        logo: logoUrl,
        hq_country: hq_country.name,
        categories_sdgs: categories_sdgs.map((opt) => opt.value),
        ...newData,
      };
      const diff = getPayloadDiff(initial, changes);

      if (Object.entries(diff).length <= 0) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      /** already clean - no need to futher clean "": to unset values { field: val }, field must have a value 
     like ""; unlike contracts where if fields is not present, val is set to null.
    */
      const updates: Partial<EndowmentProfileUpdate> = {
        ...diff,
        id,
        owner: cw3,
      };

      showModal(TxPrompt, { loading: "Signing changes" });
      const payload = await createADR36Payload(updates, wallet!);

      const result = await submit(payload); //wallet is asserted in admin guard
      if ("error" in result) {
        return showModal(TxPrompt, { error: "Failed to update profile" });
      }

      return showModal(TxPrompt, {
        success: {
          message: "Profile successfully updated",
          link: {
            description: "View changes",
            url: `${appRoutes.profile}/${id}`,
          },
        },
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return {
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
