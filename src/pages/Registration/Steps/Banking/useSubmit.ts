import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues as FV } from "./types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

export default function useSubmit(form: UseFormReturn<FV>) {
  const { data } = useRegState<5>();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = form;

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && data.banking?.BankStatementFile) {
      return navigate(`../${steps.summary}`, { state: data.init });
    }
    const result = await updateReg({
      reference: data.init.reference,
      type: "banking",
      BankStatementFile: {
        name: fv.bankStatement.files[0]?.name || "placeholder banking",
        publicUrl: "https://google.com",
      },
    });

    if ("error" in result) {
      return handleError(result.error);
    }
    return navigate(`../${steps.summary}`, { state: data.init });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
