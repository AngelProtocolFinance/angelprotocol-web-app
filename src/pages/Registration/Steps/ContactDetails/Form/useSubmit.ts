import { useErrorContext } from "contexts/ErrorContext";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import type { FormValues as FV } from "../types";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();
  const {
    data: { init, contact },
  } = useRegState<1>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && contact) {
      return navigate(`../${steps.orgDetails}`, { state: init }); // go to latest step
    }

    const { org_role, referral_method, id, registrant_id, ...rest } = fv;

    const result = await updateReg({
      type: "contact",
      ...rest,
      org_role: org_role.value,
      referral_method: referral_method.value,
      id,
    });

    if ("error" in result) {
      return handleError(result.error, { context: "updating registration" });
    }

    navigate(`../${steps.orgDetails}`, { state: init });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
