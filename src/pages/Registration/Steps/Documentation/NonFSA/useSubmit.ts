import { useErrorContext } from "contexts/ErrorContext";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import { FormValues as FV, Props } from "./types";

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
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && props.doc) {
      return navigate(`../${steps.banking}`, { state: data.init });
    }
    const result = await updateReg({
      reference: data.init.reference,
      type: "documentation",
      DocType: "Non-FSA",
      EIN: fv.EIN,
    });

    if ("error" in result) {
      return handleError(result.error);
    }
    return navigate(`../${steps.banking}`, { state: data.init });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
