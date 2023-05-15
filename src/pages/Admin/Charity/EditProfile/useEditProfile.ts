import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues as FV, FlatFormValues } from "./types";
import { EndowmentProfileUpdate } from "types/aws";
import { SemiPartial } from "types/utils";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import useUpdateEndowmentProfile from "hooks/useUpdateEndowmentProfile";
import { isEVM, isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { isPolygonChain } from "helpers/isPolygonChain";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";

// import optimizeImage from "./optimizeImage";

export default function useEditProfile() {
  const { id, owner, propMeta } = useAdminResources<"charity">();
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const { wallet } = useGetWallet();
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
      if (!wallet) {
        return showModal(TxPrompt, {
          error: "You need to connect your wallet to make this transaction.",
        });
      }

      if (!isEVM(wallet.providerId)) {
        return showModal(TxPrompt, {
          error: "Please connect an EVM compatible wallet",
        });
      }

      if (!isPolygonChain(wallet.chain.chain_id)) {
        return showModal(TxPrompt, {
          error: "Please connect to the Polygon Network",
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
      const updates: SemiPartial<EndowmentProfileUpdate, "id" | "owner"> = {
        ...diff,
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
