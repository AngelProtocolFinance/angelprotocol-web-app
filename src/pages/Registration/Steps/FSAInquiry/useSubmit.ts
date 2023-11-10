import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Step3Data } from "../../types";
import { FV } from "./types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";

export default function useSubmit(
  data: Step3Data,
  form: UseFormReturn<FV>,
  thisStep: number
) {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = form;

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && data.fsaInquiry !== undefined) {
      return navigate(`../${thisStep + 1}`, { state: data.init });
    }
    const result = await updateReg({
      reference: data.init.reference,
      type: "fsa-inquiry",
      AuthorizedToReceiveTaxDeductibleDonations:
        fv.AuthorizedToReceiveTaxDeductibleDonations === "Yes",
    });

    if ("error" in result) {
      return handleError(result.error);
    }

    navigate(`../${thisStep + 1}`, { state: data.init });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}
