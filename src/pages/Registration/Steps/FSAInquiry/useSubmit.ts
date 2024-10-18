import type { Update } from "@better-giving/registration/update";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useFetcher, useNavigate } from "react-router-dom";
import { steps } from "../../routes";
import type { Step3Data } from "../../types";
import type { FV } from "./types";

export default function useSubmit(
  data: Step3Data,
  form: UseFormReturn<FV>,
  possiblyTaxExempt: boolean
) {
  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const fetcher = useFetcher();

  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && data.irs501c3 !== undefined && possiblyTaxExempt) {
      return navigate(`../${steps.docs}`);
    }
    const update: Update = {
      type: "fsa-inq",
      irs501c3: possiblyTaxExempt && fv.irs501c3 === "yes",
    };
    fetcher.submit(update, {
      encType: "application/json",
      action: ".",
      method: "patch",
    });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting: fetcher.state !== "idle",
  };
}
