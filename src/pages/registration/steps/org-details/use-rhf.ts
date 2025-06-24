import type { Init, Org } from "@better-giving/registration/models";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useController, useForm } from "react-hook-form";
import { type FV, schema } from "./schema";

function to_form(org: Org): FV {
  return {
    //level 1
    website: org.website,
    hq_country: org.hq_country,
    designation: org.designation,
    //general
    active_in_countries: org.active_in_countries ?? [],
  };
}
export const use_rhf = (org: Org | undefined, init: Init) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: org
      ? to_form(org)
      : {
          website: "",
          hq_country: init.claim ? "United States" : "",
          designation: "" as any,
          active_in_countries: [],
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
  };
};
