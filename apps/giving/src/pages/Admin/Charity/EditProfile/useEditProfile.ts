import { ImgLink } from "@ap/components/img-editor";
import { TxPrompt } from "@ap/components/prompt";
import { appRoutes } from "@ap/constants";
import { useModalContext } from "@ap/contexts";
import { useAdminResources } from "@ap/contexts/admin";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { getFullURL, getPayloadDiff, isEmpty, uploadFiles } from "@ap/helpers";
import { useEditProfileMutation } from "@ap/services/aws";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues as FV, FlatFormValues } from "./types";
import { EndowmentProfileUpdate } from "@ap/types/aws";
import { createADR36Payload } from "./createADR36Payload";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { id, owner, propMeta } = useAdminResources<"charity">();
  const {
    reset,
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
    active_in_countries,
    ...newData
  }) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useCosmosTxSender
       */
      if (!wallet) {
        return showModal(TxPrompt, {
          error: "You need to connect your wallet to make this transaction.",
        });
      }
      if (!propMeta.isAuthorized) {
        return showModal(TxPrompt, {
          error: "You are not authorized to make this transaction.",
        });
      }

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
      const updates: Partial<EndowmentProfileUpdate> = {
        ...diff,
        id,
        owner,
      };

      showModal(
        TxPrompt,
        { loading: "Signing changes" },
        { isDismissible: false }
      );
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
