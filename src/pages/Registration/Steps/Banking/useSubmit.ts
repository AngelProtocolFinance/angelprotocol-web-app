import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import type { OnSubmit } from "components/BankDetails";
import { getFilePreviews } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

export default function useSubmit() {
  const { data } = useRegState<5>();
  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: OnSubmit = async (recipient, file) => {
    try {
      if (!recipient) {
        return handleError("Failed to create recipient");
      }

      const bankStatementPreview = await getFilePreviews({
        bankStatementFile: { previews: [], files: [file] },
      });

      const result = await updateReg({
        reference: data.init.reference,
        type: "banking",
        BankStatementFile: bankStatementPreview.bankStatementFile[0],
        wise_recipient_id: recipient.id,
      });

      if ("error" in result) {
        return handleError(result.error);
      }

      return navigate(`../${steps.summary}`, { state: data.init });
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  };

  return { submit };
}
