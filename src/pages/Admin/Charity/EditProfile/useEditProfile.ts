import { yupResolver } from "@hookform/resolvers/yup";
import type { ImgLink } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { type SubmitHandler, useController, useForm } from "react-hook-form";
import { useLazyProfileQuery } from "services/aws/aws";
import type { EndowmentProfileUpdate } from "types/aws";
import { useAdminContext } from "../../Context";
import { useUpdateEndowment } from "../common";
import { schema } from "./schema";
import type { FV } from "./types";
import { toProfileUpdate } from "./update";

export default function useEditProfile(init: FV) {
  const { id } = useAdminContext();
  const {
    register,
    reset,
    resetField,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FV>({ defaultValues: init, resolver: yupResolver(schema) });

  const { showModal } = useModalContext();
  const { displayError, handleError } = useErrorContext();
  const [endowment] = useLazyProfileQuery();
  const updateEndow = useUpdateEndowment();

  const slug = watch("slug");
  const { field: card_img } = useController({ control, name: "card_img" });
  const { field: banner } = useController({ control, name: "image" });
  const { field: logo } = useController({ control, name: "logo" });
  const { field: overview } = useController({ control, name: "overview" });
  const { field: sdgs } = useController({ control, name: "sdgs" });
  const { field: designation } = useController({
    control,
    name: "endow_designation",
  });
  const { field: hqCountry } = useController({
    control,
    name: "hq_country",
  });
  const { field: activityCountries } = useController({
    control,
    name: "active_in_countries",
  });
  const { field: published } = useController({
    control,
    name: "published",
  });

  const editProfile: SubmitHandler<FV> = async ({ initial, ...fv }) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useTxSender
       */

      const [bannerUrl, logoUrl, cardImgUrl] = await uploadImgs(
        [fv.image, fv.logo, fv.card_img],
        () => {
          showModal(
            Prompt,
            { type: "loading", children: "Uploading images.." },
            { isDismissible: false }
          );
        }
      );

      const update = toProfileUpdate({
        type: "final",
        data: { ...fv, id },
        urls: { image: bannerUrl, logo: logoUrl, card_img: cardImgUrl },
      });

      const diffs = getPayloadDiff(initial, update);

      if (isEmpty(diffs)) return displayError("No changes detected");

      //dont check hit if unsetting
      if (update.slug && update.slug !== initial.slug) {
        const result = await endowment({ slug: update.slug });
        //endow is found with update.slug
        if (result.isSuccess) {
          return displayError(`Slug "${update.slug}" is already taken`);
        }
      }

      type Cleaned = Partial<EndowmentProfileUpdate>;
      //only include top level keys that appeared on diff
      const cleanUpdate = diffs.reduce<Cleaned>((result, [path]) => {
        const key = path.split(".")[0] as keyof Cleaned;
        return { ...result, [key]: update[key] };
      }, {});

      await updateEndow({ ...cleanUpdate, id });
    } catch (err) {
      handleError(err, { context: "applying profile changes" });
    }
  };

  return {
    editProfile: handleSubmit(editProfile),
    id,
    //rhf
    register,
    errors,
    reset,
    resetField,
    isSubmitting,
    trigger,
    isDirty,
    //controllers
    card_img,
    logo,
    banner,
    overview,
    slug,
    sdgs,
    designation,
    hqCountry,
    activityCountries,
    published,
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
