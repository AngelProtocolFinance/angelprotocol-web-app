import { yupResolver } from "@hookform/resolvers/yup";
import type { ImgLink } from "components/ImgEditor";
import { useController, useForm } from "react-hook-form";
import { genFileSchema } from "schemas/file";
import { schema } from "schemas/shape";
import type { SchemaShape } from "schemas/types";
import type { ImageMIMEType } from "types/lists";
import { object, string } from "yup";
import type { FV, Props } from "./types";

export const AVATAR_MAX_SIZE_BYTES = 1e6;
export const AVATAR_MIME_TYPE: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const fileObj = object<any, SchemaShape<ImgLink>>({
  file: genFileSchema(AVATAR_MAX_SIZE_BYTES, AVATAR_MIME_TYPE),
});

export function useRhf(props: Props) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    resetField,
    trigger,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    resolver: yupResolver(
      schema<FV>({
        firstName: string().required("required"),
        lastName: string().required("required"),
        avatar: fileObj,
      })
    ),
    defaultValues: {
      prefCurrency: props.defaultCurr || { code: "usd", min: 1, rate: 1 },
      firstName: props.user.firstName ?? "",
      lastName: props.user.lastName ?? "",
      avatar: {
        name: "",
        preview: props.user.avatar ?? "",
        publicUrl: props.user.avatar ?? "",
      },
    },
  });

  const { field: prefCurrency } = useController<FV, "prefCurrency">({
    control,
    name: "prefCurrency",
  });

  const { field: avatar } = useController<FV, "avatar">({
    control,
    name: "avatar",
  });

  return {
    prefCurrency,
    avatar,
    register,
    handleSubmit,
    resetField,
    reset,
    trigger,
    isSubmitting,
    errors,
    isDirty,
  };
}
