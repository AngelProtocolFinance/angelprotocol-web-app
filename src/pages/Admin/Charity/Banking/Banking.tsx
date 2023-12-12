import { useState } from "react";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { useAdminContext } from "pages/Admin/Context";
import { useUpdateBankStatementMutation } from "services/aws/aws";
import { useCreateRecipientAccountMutation } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import BankDetails from "components/BankDetails";
import Group from "components/Group";
import { getFilePreviews } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import FormButtons from "./FormButtons";

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [isSubmitting, setSubmitting] = useState(false);

  const [createRecipientAccount] = useCreateRecipientAccountMutation();
  const [updateBankStatement] = useUpdateBankStatementMutation();

  const { handleError } = useErrorContext();

  const submit = async (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset
  ) => {
    try {
      setSubmitting(true);

      const bankStatementPreview = await getFilePreviews({
        bankStatementFile,
      });

      await updateBankStatement({
        id: endowment_id,
        bank_statement_file: bankStatementPreview.bankStatementFile[0],
      }).unwrap();

      await createRecipientAccount({
        endowmentId: endowment_id,
        request,
      }).unwrap();
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Group
      className="max-w-4xl"
      title="Bank account details"
      description="The following information will be used to register your bank account that will be used to withdraw your funds."
    >
      <BankDetails
        FormButtons={FormButtons}
        isSubmitting={isSubmitting}
        onInitiateUpdate={() => {}}
        onSubmit={submit}
        shouldUpdate
      />
    </Group>
  );
}
