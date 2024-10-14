import { valibotResolver } from "@hookform/resolvers/valibot";
import { useController, useForm } from "react-hook-form";
import { type FV, schema } from "./schema";
export default function useRhf(init: FV) {
  const {
    handleSubmit,
    register,
    reset,
    resetField,
    control,
    trigger,
    watch,
    formState: { isSubmitting, errors, isDirty, dirtyFields },
  } = useForm<FV>({ defaultValues: init, resolver: valibotResolver(schema) });

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

  return {
    //rhf
    register,
    errors,
    reset,
    resetField,
    isSubmitting,
    trigger,
    isDirty,
    dirtyFields,
    handleSubmit,
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
