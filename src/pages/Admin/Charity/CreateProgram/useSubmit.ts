import { SubmitHandler, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { EndowmentProfileUpdate } from "types/aws";
import { SemiPartial } from "types/utils";
import { useModalContext } from "contexts/ModalContext";
import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import { isEmpty } from "helpers";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { useAdminContext } from "../../Context";
import useUpdateEndowmentProfile from "../common/useUpdateEndowmentProfile";
import { ops } from "./ops";

export default function useSubmit() {
  const { id, owner } = useAdminContext<"charity">(ops);
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const updateProfile = useUpdateEndowmentProfile();

  const editProfile: SubmitHandler<FV> = async (fv) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useTxSender
       */

      const [imageURL] = await uploadImgs([fv.image], () => {
        showModal(
          TxPrompt,
          { loading: "Uploading images.." },
          { isDismissible: false }
        );
      });

      const updates: SemiPartial<EndowmentProfileUpdate, "id" | "owner"> = {
        program: [
          {
            program_title: fv.title,
            program_id: window.crypto.randomUUID(),
            program_description: fv.description,
            program_banner: imageURL,
            program_milestones: [],
          },
        ],
        id,
        owner,
      };

      await updateProfile(updates);
    } catch (err) {
      console.log(err);
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
