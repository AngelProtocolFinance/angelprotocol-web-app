import type { OnSubmit } from "components/BankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { toFileName } from "helpers/uploadFile";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

export default function useSubmit() {
  const { data } = useRegState<5>();
  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: OnSubmit = async (recipient, bankStatementUrl) => {
    try {
      await updateReg({
        id: data.init.id,
        type: "banking",
        bank_statement: {
          name: toFileName(bankStatementUrl) ?? "bank statement",
          publicUrl: bankStatementUrl,
        },
        wise_recipient_id: recipient.id,
      }).unwrap();

      return navigate(`../${steps.summary}`, { state: data.init });
    } catch (error) {
      handleError(error, { context: "submitting banking details" });
    }
  };

  return { submit };
}
