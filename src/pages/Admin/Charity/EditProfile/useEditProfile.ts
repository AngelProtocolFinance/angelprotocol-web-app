import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { ObjectEntries } from "types/utils";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender/useCosmosTxSender";
import {
  cleanObject,
  genDiffMeta,
  getPayloadDiff,
  getTagPayloads,
} from "helpers/admin";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";
import { appRoutes } from "constants/routes";

// import optimizeImage from "./optimizeImage";

const PLACEHOLDER_OVERVIEW = "[text]";

export default function useEditProfile() {
  const { endowmentId, cw3, propMeta } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<FV>();

  const { wallet } = useGetWallet();
  const { handleError } = useErrorContext();
  const sendTx = useCosmosTxSender();

  const editProfile = async (data: FV) => {
    const [bannerUrl, logoUrl] = await getImgUrls([data.image, data.logo]);
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
