import { toBase64, toUtf8 } from "@cosmjs/encoding";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { EndowmentProfileUpdate } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useUpdateProfileMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { cleanObject } from "helpers/admin";
import { getKeplr } from "helpers/keplr";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { endowmentId, endowment } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const { wallet } = useGetWallet();
  const [submit] = useUpdateProfileMutation();

  const editProfile = async ({ image, logo, hq_country, sdg, ...rest }: FV) => {
    const [bannerUrl, logoUrl] = await getImgUrls([image, logo]);

    const updates: EndowmentProfileUpdate = {
      ...rest,
      id: endowmentId,
      owner: endowment.owner,
      categories_sdgs: [sdg],
      logo: logoUrl,
      image: bannerUrl,
      hq_country: hq_country.name,
    };

    const { providerId, chain, address } =
      wallet!; /** asserted by admin guard */

    const toSign = toUtf8(JSON.stringify(cleanObject(updates)));
    const keplr = getKeplr(providerId);

    showModal(Prompt, {
      headline: "EDIT PROFILE",
      type: "loading",
      children: "Submitting changes..",
    });

    const signature = await keplr.signArbitrary(
      chain.chain_id,
      address,
      toSign
    );

    const result = await submit({
      signature,
      signer: address,
      data: toBase64(toSign),
    });

    if ("error" in result) {
      return showModal(Prompt, {
        headline: "EDIT PROFILE",
        type: "error",
        children: "Failed to update profile",
      });
    }

    showModal(Prompt, {
      headline: "EDIT PROFILE",
      type: "success",
      children: "Profile has been updated!",
    });
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
