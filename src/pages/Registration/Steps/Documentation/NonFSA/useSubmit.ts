import { getEndowWithEin } from "api/get/endow-with-ein";
import { useErrorContext } from "contexts/ErrorContext";
import { toWithState } from "helpers/state-params";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import type { FormValues as FV, Props } from "./types";

type Args = {
  props: Props;
  form: UseFormReturn<FV>;
};

export default function useSubmit({ form, props }: Args) {
  const { data } = useRegState<4>();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = form;

  const [updateReg] = useUpdateRegMutation();
  const { handleError, displayError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && props.doc) {
      return navigate(toWithState(`../${steps.banking}`, data.init));
    }

    if (!data.init.claim && fv.ein !== props.doc?.ein) {
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

    const result = await updateReg({
      id: data.init.id,
      type: "docs",
      ein: fv.ein,
    });

    if ("error" in result) {
      return handleError(result.error, { context: "submitting documentation" });
    }
    return navigate(toWithState(`../${steps.banking}`, data.init));
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
