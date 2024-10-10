import type { OnSubmit } from "components/BankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { toState } from "helpers/state-params";
import { uploadFile } from "helpers/uploadFile";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

export default function useSubmit() {
  const { data } = useRegState<5>();
  const [updateReg] = useUpdateRegMutation();
  const { handleError, displayError } = useErrorContext();
  const navigate = useNavigate();

  const submit: OnSubmit = async (recipient, file) => {
    try {
      const bankStatement = await uploadFile(file, "endow-reg");
      if (!bankStatement) {
        return displayError("Failed to upload bank statement");
      }

      await updateReg({
        id: data.init.id,
        type: "banking",
        bank_statement: bankStatement,
        wise_recipient_id: recipient.id,
      }).unwrap();

      return navigate(`../${steps.summary}?_s=${toState(data.init)}`);
    } catch (error) {
      handleError(error, { context: "submitting banking details" });
    }
  };

  return { submit };
}
