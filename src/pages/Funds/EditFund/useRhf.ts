import type { SingleFund } from "@better-giving/fundraiser";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { parseContent } from "components/RichText";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { type FV, schema } from "./schema";

export function useRhf(init: SingleFund) {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    resetField,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    values: {
      name: init.name,
      description: parseContent(init.description),
      target:
        init.target === "0"
          ? { type: "none" }
          : init.target === "smart"
            ? { type: "smart" }
            : { type: "fixed", value: init.target },
      logo: init.logo,
      banner: init.banner,
      videos: init.videos.map((v) => ({ url: v })),
    },
  });

  const { field: targetType } = useController({
    control,
    name: "target.type",
  });

  const { field: desc } = useController({
    control,
    name: "description",
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
    targetType,
    logo,
    banner,
    desc,
    videos,
    isUploading: logo.value === "loading" || banner.value === "loading",
  };
}
