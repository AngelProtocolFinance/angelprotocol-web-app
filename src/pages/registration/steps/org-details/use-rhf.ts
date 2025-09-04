import type { IReg } from "@better-giving/reg";
import { valibotResolver } from "@hookform/resolvers/valibot";
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
      website: reg.o_website,
      hq_country: reg.o_hq_country ?? "", // opt init display
      designation: reg.o_designation ?? ("" as any), // opt init display
      active_in_countries: reg.o_active_in_countries ?? [],
    },
  });

  const { field: designation } = useController({
    control,
    name: "designation",
  });
  const { field: hq_country } = useController({
    control,
    name: "hq_country",
  });
  const { field: countries } = useController({
    control,
    name: "active_in_countries",
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
