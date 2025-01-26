import type { EndowClaim } from "@better-giving/registration/models";
import type { Update } from "@better-giving/registration/update";
import { useFetcher } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { getEndowWithEin } from "api/get/endow-with-ein";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { steps } from "../../../routes";
import type { FV, Props } from "./types";

type Args = {
  isDirty: boolean;
  props: Props;
  initClaim: EndowClaim | undefined;
};

export default function useSubmit({ props, initClaim, isDirty }: Args) {
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
          return toast.info(
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
      method: "PATCH",
    });
  };

  return {
    submit,
    state: fetcher.state,
  };
}
