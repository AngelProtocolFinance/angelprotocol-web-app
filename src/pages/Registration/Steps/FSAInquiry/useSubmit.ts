import { useErrorContext } from "contexts/ErrorContext";
import { toState } from "helpers/state-params";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
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
    formState: { isDirty, isSubmitting },
  } = form;

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && data.irs501c3 !== undefined && possiblyTaxExempt) {
      return navigate(`../${steps.docs}?_s=${toState(data.init)}`);
    }
    const result = await updateReg({
      id: data.init.id,
      type: "fsa-inq",
      irs501c3: possiblyTaxExempt && fv.irs501c3 === "yes",
    });

    if ("error" in result) {
      return handleError(result.error, { context: "updating registration" });
    }

    navigate(`../${steps.docs}?_s=${toState(data.init)}`);
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
