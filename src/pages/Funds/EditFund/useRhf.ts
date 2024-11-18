import type { SingleFund } from "@better-giving/fundraiser";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { parseContent } from "components/RichText";
import { useController, useForm } from "react-hook-form";
import { type FV, schema } from "./schema";

export function useRhf(init: SingleFund) {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    resetField,
    formState: { isSubmitting, errors, isDirty, dirtyFields },
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
      logo: { name: "", preview: init.logo, publicUrl: init.logo },
      banner: { name: "", preview: init.banner, publicUrl: init.banner },
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

  return {
    register,
    handleSubmit,
    isSubmitting,
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
  };
}
