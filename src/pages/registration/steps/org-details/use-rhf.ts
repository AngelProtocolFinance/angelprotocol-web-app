import type { IReg } from "@better-giving/reg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { sans_https } from "helpers/https";
import { useController, useForm } from "react-hook-form";
import { type FV, schema } from "./schema";

export const use_rhf = (reg: IReg) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: {
      o_website: sans_https(reg.o_website),
      o_hq_country: reg.claim ? "United States" : (reg.o_hq_country ?? ""), // opt init display
      o_designation: reg.o_designation ?? ("" as any), // opt init display
      o_active_in_countries: reg.o_active_in_countries ?? [],
    },
  });

  const { field: designation } = useController({
    control,
    name: "o_designation",
  });
  const { field: hq_country } = useController({
    control,
    name: "o_hq_country",
  });
  const { field: countries } = useController({
    control,
    name: "o_active_in_countries",
  });

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    designation,
    hq_country,
    countries,
    dirtyFields,
  };
};
