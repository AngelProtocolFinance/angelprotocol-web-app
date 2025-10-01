import { valibotResolver } from "@hookform/resolvers/valibot";
import { toContent } from "components/rich-text";
import { useController, useFieldArray, useForm } from "react-hook-form";
import type { IFund } from "types/fund";
import { type FV, schema } from "./schema";

export function use_rhf(init: IFund) {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    resetField,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    values: {
      name: init.name,
      description: toContent(init.description),
      slug: init.slug ?? "",
      target:
        init.target === "0"
          ? { type: "none" }
          : init.target === "smart"
            ? { type: "smart" }
            : { type: "fixed", value: init.target },
      logo: init.logo,
      banner: init.banner,
      videos: init.videos.map((v) => ({ url: v })),
      increments: init.increments ?? [],
    },
  });

  const slug = watch("slug");
  const incs = watch("increments");

  const { field: target_type } = useController({
    control,
    name: "target.type",
  });

  const { field: desc } = useController({
    control,
    name: "description",
  });
  const increments = useFieldArray({
    control,
    name: "increments",
  });

  const { field: logo } = useController({ control, name: "logo" });
  const { field: banner } = useController({ control, name: "banner" });
  const videos = useFieldArray<Pick<FV, "videos">>({
    control: control as any,
    name: "videos",
  });

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    dirtyFields,
    trigger,
    resetField,
    //controllers
    slug,
    target_type,
    logo,
    banner,
    desc,
    videos,
    increments,
    incs,
    is_uploading: logo.value === "loading" || banner.value === "loading",
  };
}
