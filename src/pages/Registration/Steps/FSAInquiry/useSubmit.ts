import { useErrorContext } from "contexts/ErrorContext";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../routes";
import type { Step3Data } from "../../types";
import type { FV } from "./types";

export default function useSubmit(data: Step3Data, form: UseFormReturn<FV>) {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = form;

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && data.fsaInquiry !== undefined) {
      return navigate(`../${steps.docs}`, { state: data.init });
    }
    const result = await updateReg({
      reference: data.init.reference,
      type: "fsa-inquiry",
      AuthorizedToReceiveTaxDeductibleDonations:
        fv.AuthorizedToReceiveTaxDeductibleDonations === "Yes",
    });

    if ("error" in result) {
      return handleError(result.error, { context: "updating registration" });
    }

    navigate(`../${steps.docs}`, { state: data.init });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
