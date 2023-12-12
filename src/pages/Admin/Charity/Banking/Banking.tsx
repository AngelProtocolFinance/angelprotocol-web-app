import { useState } from "react";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { useAdminContext } from "pages/Admin/Context";
import { useNewBankingApplicationMutation } from "services/aws/banking-applications";
import { useAccountMutation } from "services/aws/wise";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import BankDetails from "components/BankDetails";
import Group from "components/Group";
import Prompt from "components/Prompt";
import { getFilePreviews } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import FormButtons from "./FormButtons";

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [createRecipient] = useAccountMutation();
  const [newApplication] = useNewBankingApplicationMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  const submit = async (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset
  ) => {
    try {
      setSubmitting(true);

      const [bankStatementPreview, recipient] = await Promise.all([
        getFilePreviews({
          bankStatementFile,
        }),
        createRecipient(request).unwrap(),
      ]);

      const { id, details, currency } = recipient;
      await newApplication({
        wiseRecipientID: id.toString(),
        payoutCurrency: currency,
        bankName: details.bankName || details.bankCode || "N/A",
        bankAccountNumber: details.accountNumber?.slice(-4) || "00000",
        endowmentID: endowment_id,
        bankStatementFile: bankStatementPreview.bankStatementFile[0],
        ...(details.email ? { email: details.email } : {}),
      }).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: <p className="py-8">Banking details submitted for review!</p>,
      });
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
