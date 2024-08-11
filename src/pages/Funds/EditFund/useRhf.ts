import { yupResolver } from "@hookform/resolvers/yup";
import type { ImgLink } from "components/ImgEditor";
import { useController, useForm } from "react-hook-form";
import { genFileSchema } from "schemas/file";
import { schema as schemaFn, stringNumber } from "schemas/shape";
import type { Fund } from "types/aws";
import { string } from "yup";
import {
  MAX_SIZE_IN_BYTES,
  type TargetType,
  VALID_MIME_TYPES,
} from "../common";
import type { FV } from "./types";

const fileObj = schemaFn<ImgLink>({
  file: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

const targetTypeKey: keyof FV = "targetType";
const schema = schemaFn<FV>({
  name: string().required("required"),
  description: string().required("required"),
  fixedTarget: stringNumber(
    (str) => {
      return str.when(targetTypeKey, (values, schema) => {
        const [type] = values as [TargetType];
        return type === "fixed" ? schema.required("required") : schema;
      });
    },
    (n) => {
      return n.when(targetTypeKey, (values, schema) => {
        const [type] = values as [TargetType];
        return type === "fixed"
          ? schema.positive("must be greater than 0")
          : schema;
      });
    }
  ),
  logo: fileObj,
  banner: fileObj,
});

export function useRhf(init: Fund) {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    resetField,
    formState: { isSubmitting, errors, isDirty, dirtyFields },
  } = useForm<FV>({
    resolver: yupResolver(schema),
    values: {
      name: init.name,
      description: init.description,
      featured: init.featured,
      targetType: !init.target
        ? "none"
        : init.target === "smart"
          ? "smart"
          : "fixed",
      fixedTarget: init.target === "smart" ? "" : init.target ?? "",
      logo: { name: "", preview: init.logo, publicUrl: init.logo },
      banner: { name: "", preview: init.banner, publicUrl: init.banner },
    },
  });

  const { field: targetType } = useController({
    control,
    name: "targetType",
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
  };
}
