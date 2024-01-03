import { useState } from "react";
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
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => {
    try {
      if (!isDirty && data.banking?.BankStatementFile) {
        return navigate(`../${steps.summary}`, { state: data.init });
      }

      setSubmitting(true);

      const bankStatementPreview = await getFilePreviews({
        bankStatementFile,
      });

      // we need to pass this variable to `updateReg` in order to update
      // its the cache registration data once the request is succesful
      const { wise_recipient_id } = await createRecipientAccount({
        PK: data.contact.PK,
        request,
      }).unwrap();

      await updateReg({
        reference: data.init.reference,
        type: "banking",
        BankStatementFile: bankStatementPreview.bankStatementFile[0],
        wise_recipient_id,
      }).unwrap();

      return navigate(`../${steps.summary}`, { state: data.init });
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return { isSubmitting, submit };
}
