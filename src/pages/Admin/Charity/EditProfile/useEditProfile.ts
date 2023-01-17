import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues as FV, FlatFormValues } from "./types";
import { EndowmentProfileUpdate } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useEditProfileMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import { getPayloadDiff } from "helpers/admin";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";
import { appRoutes } from "constants/routes";
import { createADR36Payload } from "./createADR36Payload";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { endowmentId, endowment } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const [submit] = useEditProfileMutation();

  const editProfile: SubmitHandler<FV> = async ({
    initial,
    image,
    logo,
    hq_country,
    ...newData
  }) => {
    const [bannerUrl, logoUrl] = await uploadImgs([image, logo]);

    const changes: FlatFormValues = {
      image: bannerUrl,
      logo: logoUrl,
      hq_country: hq_country.name,
      ...newData,
    };
    const diff = getPayloadDiff(initial, changes);

    if (Object.entries(diff).length <= 0) {
      return showModal(TxPrompt, { error: "No changes detected" });
    }

    /** already clean - no need to futher clean "": to unset values { field: val }, field must have a value 
     like ""; unlike contracts where if fields is not present, val is set to null.
    */
    const { sdg, ...restDiff } = diff;
    const updates: Partial<EndowmentProfileUpdate> = {
      ...restDiff,
      ...(sdg != null ? { categories_sdgs: [sdg] } : {}),
      id: endowmentId,
      owner: endowment.owner,
    };
    const result = await submit(await createADR36Payload(updates, wallet!)); //wallet is asserted in admin guard
    if ("error" in result) {
      return showModal(TxPrompt, { error: "Failed to update profile" });
    }

    return showModal(TxPrompt, {
      success: {
        message: "Profile successfully updated",
        link: {
          description: "View changes",
          url: `${appRoutes.profile}/${endowmentId}`,
        },
      },
    });
  };

  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
    id: endowmentId,
  };
}

async function uploadImgs(imgs: ImgLink[]): Promise<string[]> {
  const files = imgs.flatMap((img) => (img.file ? [img.file] : []));
  const cid = await uploadToIpfs(files);
  return imgs.map((img) =>
    img.file && cid ? genPublicUrl(cid, img.file.name) : img.publicUrl
  );
}
