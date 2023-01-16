import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { ImgLink } from "components/ImgEditor";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { endowmentId } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<FV>();

  const editProfile = async (data: FV) => {
    const [bannerUrl, logoUrl] = await getImgUrls([data.image, data.logo]);
    console.log(bannerUrl, logoUrl);
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
