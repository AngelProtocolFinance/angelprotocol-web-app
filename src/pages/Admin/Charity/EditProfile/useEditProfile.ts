import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { EndowmentProfileUpdate } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import { useUpdateProfileMutation } from "services/aws/aws";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import { toBase64 } from "helpers";
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

  const { wallet } = useGetWallet();
  const [submit] = useUpdateProfileMutation();

  const editProfile = async (data: FV) => {
    const [bannerUrl, logoUrl] = await getImgUrls([data.image, data.logo]);

    const payload: EndowmentProfileUpdate = {
      ...data,
      id: endowmentId,
      owner: endowment.owner,
      categories_sdgs: [data.sdg],
      logo: logoUrl,
      image: bannerUrl,
      hq_country: data.hq_country.name,
    };

    const signedPayload = toBase64(cleanObject(payload));
    const { providerId, chain, address } =
      wallet!; /** asserted by admin guard */
    const keplr = getKeplr(providerId);
    const signature = await keplr.signArbitrary(
      chain.chain_id,
      address,
      signedPayload
    );

    const result = await submit({
      signature,
      data: signedPayload,
      signer: address,
    });

    console.log(result);
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
