import { SubmitHandler, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { useAdminContext } from "../../Context";
import useUpdateEndowmentProfile from "../common/useUpdateEndowmentProfile";
import { ops } from "./ops";
import { toProfileUpdate } from "./update";

export default function useEditProfile() {
  const { id, owner } = useAdminContext<"charity">(ops);
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const updateProfile = useUpdateEndowmentProfile();

  const editProfile: SubmitHandler<FV> = async ({ initial, type, ...fv }) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useTxSender
       */

      const [bannerUrl, logoUrl] = await uploadImgs([fv.image, fv.logo], () => {
        showModal(
          TxPrompt,
          { loading: "Uploading images.." },
          { isDismissible: false }
        );
      });

      const update = toProfileUpdate({
        type: "final",
        data: { ...fv, id, owner },
        urls: { image: bannerUrl, logo: logoUrl },
      });

      const diff = getPayloadDiff(initial, update);

      if (Object.entries(diff).length <= 0) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      await updateProfile(removeEmptyValues(update));
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

interface AnyObject {
  [key: string]: any;
}

const removeEmptyValues = <T extends AnyObject>(obj: T): T => {
  const newObj: AnyObject = JSON.parse(JSON.stringify(obj));

  const removeEmpty = (data: AnyObject): AnyObject => {
    if (Array.isArray(data)) {
      return data.filter((value: any) => {
        if (typeof value === "object") {
          const updatedValue = removeEmpty(value);
          return Object.keys(updatedValue).length !== 0;
        }
        return true;
      });
    }

    return Object.entries(data).reduce(
      (acc: AnyObject, [key, value]: [string, any]) => {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return acc;
        } else if (typeof value === "object") {
          const updatedValue = removeEmpty(value);
          if (Object.keys(updatedValue).length === 0) {
            return acc;
          }
          return { ...acc, [key]: updatedValue };
        } else {
          return { ...acc, [key]: value };
        }
      },
      {}
    );
  };

  return removeEmpty(newObj) as T;
};
