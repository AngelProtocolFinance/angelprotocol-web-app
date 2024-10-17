import type { OnSubmit } from "components/BankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { getFilePreviews } from "helpers";
import { toWithState } from "helpers/state-params";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

export default function useSubmit() {
  const { data } = useRegState<5>();
  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: OnSubmit = async (recipient, file) => {
    try {
      const bankStatementPreview = await getFilePreviews({
        bankStatementFile: { previews: [], files: [file] },
      });

      await updateReg({
        id: data.init.id,
        type: "banking",
        bank_statement: bankStatementPreview.bankStatementFile[0],
        wise_recipient_id: recipient.id,
      }).unwrap();

      return navigate(toWithState(`../${steps.summary}`, data.init));
    } catch (error) {
      handleError(error, { context: "submitting banking details" });
    }
  };

  return { submit };
}
