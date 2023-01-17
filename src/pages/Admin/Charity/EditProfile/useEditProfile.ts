import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues as FV, FlatFormValues } from "./types";
import { EndowmentProfileUpdate } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { ImgLink } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { getPayloadDiff } from "helpers/admin";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { endowmentId, endowment } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();

  const editProfile: SubmitHandler<FV> = async ({
    initial,
    image,
    logo,
    hq_country,
    sdg,
    ...newData
  }) => {
    const [bannerUrl, logoUrl] = await getImgUrls([image, logo]);

    const changes: FlatFormValues = {
      image: bannerUrl,
      logo: logoUrl,
      hq_country: hq_country.name,
      sdg,
      ...newData,
    };
    const diff = getPayloadDiff(initial, changes);

    if (Object.entries(diff).length <= 0) {
      return showModal(Prompt, {
        headline: "Edit profile",
        type: "error",
        children: "No changes detected.",
      });
    }

    const sdgKey: keyof FlatFormValues = "sdg";

    /** already clean - no need to futher clean "": to unset values { field: val }, field must have a value 
     like ""; unlike contracts where if fields is not present, val is set to null.
    */
    const updates: Partial<EndowmentProfileUpdate> = {
      ...diff,
      ...(sdgKey in diff ? { categories_sdgs: [sdg] } : {}),
      id: endowmentId,
      owner: endowment.owner,
    };

    console.log(updates);
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
