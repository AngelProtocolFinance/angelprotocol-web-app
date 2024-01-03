import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { useAdminContext } from "pages/Admin/Context";
import { useNewBankingApplicationMutation } from "services/aws/banking-applications";
import { useCreateRecipientMutation } from "services/aws/wise";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import BankDetails from "components/BankDetails";
import Group from "components/Group";
import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { getFilePreviews } from "helpers";
import { adminRoutes } from "constants/routes";
import FormButtons from "./FormButtons";

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [createRecipient] = useCreateRecipientMutation();
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
      //creating account return V1Recipient and doesn't have longAccount summary field
      const bankSummary = `${currency.toUpperCase()} account ending in ${details.accountNumber?.slice(
        -4 || "0000"
      )} `;
      await newApplication({
        wiseRecipientID: id.toString(),
        bankSummary,
        endowmentID: endowment_id,
        bankStatementFile: bankStatementPreview.bankStatementFile[0],
      }).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: <p className="py-8">Banking details submitted for review!</p>,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Link
        to={`../${adminRoutes.banking}`}
        className="flex items-center gap-1 mb-4 text-blue hover:text-blue-l1 text-sm uppercase"
      >
        <Icon type="Back" size={12} />
        <span>Back</span>
      </Link>
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
    </>
  );
}
