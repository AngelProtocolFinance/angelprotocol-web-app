import { valibotResolver } from "@hookform/resolvers/valibot";
import type { ImgSpec } from "components/ImgEditor";
import { useController, useForm } from "react-hook-form";
import { type FV, type LoaderData, schema } from "./types";

export const avatarSpec: ImgSpec = {
  type: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  aspect: [1, 1],
  maxSize: 1e6,
  rounded: true,
};

export function useRhf(props: LoaderData) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    resetField,
    trigger,
    formState: { isDirty, errors, dirtyFields },
  } = useForm({
    resolver: valibotResolver(schema),
    values: {
      prefCurrency: props.main || { code: "usd", min: 1, rate: 1 },
      firstName: props.user.firstName ?? "",
      lastName: props.user.lastName ?? "",
      avatar: props.user.avatar ?? "",
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
    errors,
    isDirty,
    df: dirtyFields,
  };
}
