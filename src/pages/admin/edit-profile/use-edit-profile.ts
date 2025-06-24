import { useFetcher } from "@remix-run/react";
import { getEndow } from "api/get/endow";
import type { IPromptV2 } from "components/prompt";
import { errorPrompt } from "helpers/error-prompt";
import { useActionResult } from "hooks/use-action-result";
import { useState } from "react";
import type { FieldNamesMarkedBoolean, SubmitHandler } from "react-hook-form";
import type { UNSDG_NUMS } from "types/lists";
import type { EndowmentProfileUpdate } from "types/npo";
import type { FV } from "./schema";

type DirtyFields = FieldNamesMarkedBoolean<FV>;

export default function useEditProfile(df: DirtyFields) {
  const fetcher = useFetcher();
  useActionResult(fetcher.data);
  const [prompt, setPrompt] = useState<IPromptV2>();

  const onSubmit: SubmitHandler<FV> = async (fv) => {
    try {
      const update: Partial<EndowmentProfileUpdate> = {};

      if (df.logo) update.logo = fv.logo;
      if (df.image) update.image = fv.image;
      if (df.card_img) update.card_img = fv.card_img;

      if (df.slug) {
        if (fv.slug !== "") {
          const result = await getEndow(fv.slug, ["id"], false);
          //endow is found with update.slug
          if (result.id) {
            return setPrompt({
              type: "error",
              children: `Slug "${fv.slug}" is already taken`,
            });
          }
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

      if (df.sdgs) update.sdgs = fv.sdgs.map((x) => +x as UNSDG_NUMS);
      if (df.endow_designation) update.endow_designation = fv.endow_designation;

      if (df.hq_country) update.hq_country = fv.hq_country;
      if (df.active_in_countries) {
        update.active_in_countries = fv.active_in_countries;
      }

      if (df.street_address) update.street_address = fv.street_address;

      if (df.social_media_urls) update.social_media_urls = fv.social_media_urls;
      if (df.published) update.published = fv.published;

      fetcher.submit(update, {
        method: "PATCH",
        action: ".",
        encType: "application/json",
      });
    } catch (err) {
      setPrompt(errorPrompt(err, { context: "applying profile changes" }));
    }
  };

  return {
    onSubmit,
    state: fetcher.state,
    prompt,
    setPrompt,
  };
}
