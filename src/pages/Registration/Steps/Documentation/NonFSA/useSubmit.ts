import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues as FV, Props } from "./types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";

type Args = {
  props: Props;
  form: UseFormReturn<FV>;
};

export default function useSubmit({ form, props }: Args) {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = form;

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && props.doc) {
      return navigate(`../${props.thisStep}`, { state: props.init });
    }
    const result = await updateReg({
      reference: props.init.reference,
      type: "documentation",
      DocType: "Non-FSA",
      EIN: fv.EIN,
    });

    if ("error" in result) {
      return handleError(result.error);
    }
    navigate(`../${props.thisStep}`, { state: props.init });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
