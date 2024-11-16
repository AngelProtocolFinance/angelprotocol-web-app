import type { EndowDesignation } from "@better-giving/endowment";
import type { Update } from "@better-giving/registration/update";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { useFetcher } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
      un_sdg: fv.un_sdg.map(
        (sdg) => sdg.value
      ) /**TODO: AWS update to accept number[] */,
      kyc_donors_only: fv.isAnonymousDonationsAllowed === "no",
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
