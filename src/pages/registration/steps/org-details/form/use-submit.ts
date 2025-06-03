import type { EndowDesignation } from "@better-giving/endowment";
import type { Update } from "@better-giving/registration/update";
import { useFetcher } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { steps } from "../../../routes";
import type { RegStep2 } from "../../../types";
import type { FormValues } from "../types";

export default function useSubmit(org: RegStep2["data"]["org"]) {
  const {
    handleSubmit,
    formState: { isDirty },
  } = useFormContext<FormValues>();

  const fetcher = useFetcher();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    if (!isDirty && org) {
      return navigate(`../${steps.fsaInquiry}`);
    }

    const update: Update = {
      type: "org",
      //payload
      website: fv.website,
      hq_country: fv.hq_country.name,
      // required in schema
      designation: fv.designation.value as EndowDesignation,
      active_in_countries: fv.active_in_countries.map((opt) => opt.value),
    };

    fetcher.submit(update, {
      method: "PATCH",
      action: ".",
      encType: "application/json",
    });
  };
  return {
    submit: handleSubmit(submit),
    isSubmitting: fetcher.state !== "idle",
  };
}
