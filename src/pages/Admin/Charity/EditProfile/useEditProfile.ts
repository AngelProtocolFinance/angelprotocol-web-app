import type { EndowUpdate } from "@better-giving/endowment";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { uploadFile } from "helpers/uploadFile";
import type { FieldNamesMarkedBoolean, SubmitHandler } from "react-hook-form";
import {
  useEditEndowmentMutation,
  useLazyProfileQuery,
} from "services/aws/aws";
import type { UNSDG_NUMS } from "types/lists";
import type { FV } from "./schema";

type DirtyFields = FieldNamesMarkedBoolean<FV>;

export default function useEditProfile(id: number, df: DirtyFields) {
  const [submit] = useEditEndowmentMutation();
  const { showModal } = useModalContext();
  const { displayError, handleError } = useErrorContext();
  const [endowment] = useLazyProfileQuery();

  const onSubmit: SubmitHandler<FV> = async (fv) => {
    try {
      const update: EndowUpdate & { id: number } = { id };

      if (df.logo && fv.logo.file) {
        const obj = await uploadFile(fv.logo.file, "endow-profiles");
        if (!obj) return displayError("Failed to upload logo");
        update.logo = obj.publicUrl;
      }
      if (df.image && fv.image.file) {
        const obj = await uploadFile(fv.image.file, "endow-profiles");
        if (!obj) return displayError("Failed to upload image");
        update.image = obj.publicUrl;
      }
      if (df.card_img && fv.card_img.file) {
        const obj = await uploadFile(fv.card_img.file, "endow-profiles");
        if (!obj) return displayError("Failed to upload card image");
        update.card_img = obj.publicUrl;
      }

      if (df.slug) {
        const result = await endowment({ slug: fv.slug });
        //endow is found with update.slug
        if (result.isSuccess) {
          return displayError(`Slug "${fv.slug}" is already taken`);
        }
        update.slug = fv.slug;
      }

      if (df.name) update.name = fv.name;
      if (df.tagline) update.tagline = fv.tagline;
      if (df.registration_number) {
        update.registration_number = fv.registration_number;
      }

      if (df.overview) update.overview = fv.overview.value;
      if (df.url) update.url = fv.url;

      if (df.sdgs)
        update.sdgs = fv.sdgs.map((sdg) => sdg.value) as UNSDG_NUMS[];
      if (df.endow_designation)
        update.endow_designation = fv.endow_designation.value || undefined;

      if (df.hq_country) update.hq_country = fv.hq_country.name;
      if (df.active_in_countries) {
        update.active_in_countries = fv.active_in_countries.map((c) => c.value);
      }
      if (df.street_address) update.street_address = fv.street_address;

      if (df.social_media_urls) update.social_media_urls = fv.social_media_urls;
      if (df.published) update.published = fv.published;

      await submit(update).unwrap();

      return showModal(Prompt, {
        type: "success",
        children: "Successfully updated profile",
      });
    } catch (err) {
      handleError(err, { context: "applying profile changes" });
    }
  };

  return {
    onSubmit,
  };
}
