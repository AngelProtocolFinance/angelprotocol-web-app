import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { useCreateRecipientAccountMutation } from "services/aws/bankDetails";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { getFilePreviews } from "helpers";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

export default function useSubmit() {
  const { data } = useRegState<5>();
  const [createRecipientAccount] = useCreateRecipientAccountMutation();
  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit = useCallback(
    async (
      request: CreateRecipientRequest,
      bankStatementFile: FileDropzoneAsset,
      isDirty: boolean
    ) => {
      if (!isDirty && data.banking?.BankStatementFile) {
        return navigate(`../${steps.summary}`, { state: data.init });
      }

      const bankStatementPreview = await getFilePreviews({
        bankStatementFile,
      });

      await createRecipientAccount({
        PK: data.contact.PK,
        request,
      }).unwrap();

      const result = await updateReg({
        reference: data.init.reference,
        type: "banking",
        BankStatementFile: bankStatementPreview.bankStatementFile[0],
      });

      if ("error" in result) {
        return handleError(result.error);
      }
      return navigate(`../${steps.summary}`, { state: data.init });
    },
    [
      data.banking?.BankStatementFile,
      data.contact.PK,
      data.init,
      createRecipientAccount,
      handleError,
      navigate,
      updateReg,
    ]
  );

  return submit;
}
