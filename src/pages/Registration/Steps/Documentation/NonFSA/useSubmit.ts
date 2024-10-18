import type { EndowClaim } from "@better-giving/registration/models";
import type { Update } from "@better-giving/registration/update";
import { getEndowWithEin } from "api/get/endow-with-ein";
import { useErrorContext } from "contexts/ErrorContext";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useFetcher, useNavigate } from "react-router-dom";
import { steps } from "../../../routes";
import type { FormValues as FV, Props } from "./types";

type Args = {
  props: Props;
  form: UseFormReturn<FV>;
  initClaim: EndowClaim | undefined;
};

export default function useSubmit({ form, props, initClaim }: Args) {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = form;

  const { displayError } = useErrorContext();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && props.doc) {
      return navigate(`../${steps.banking}`);
    }

    if (!initClaim && fv.ein !== props.doc?.ein) {
      const endow = await getEndowWithEin(fv.ein);

      if (endow) {
        if (endow.claimed ?? true) {
          return displayError(
            `Nonprofit: ${endow.name} with EIN: ${fv.ein} already exists on our app. You must speak with an existing user of your NPO Account's members in order to be invited on as a member.`
          );
        }

        const convertToClaimNotif = `Nonprofit: ${endow.name} with EIN: ${fv.ein} already exists on our app. Would you like to claim this organization instead?`;
        if (!window.confirm(convertToClaimNotif)) return;
      }
    }

    const update: Update = {
      type: "docs",
      ein: fv.ein,
    };
    fetcher.submit(update, {
      encType: "application/json",
      action: ".",
      method: "patch",
    });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting: isSubmitting || fetcher.state !== "idle",
  };
}
