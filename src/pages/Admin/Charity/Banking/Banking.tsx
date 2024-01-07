import { Link } from "react-router-dom";
import { useAdminContext } from "pages/Admin/Context";
import { useNewBankingApplicationMutation } from "services/aws/banking-applications";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import BankDetails, { type OnSubmit } from "components/BankDetails";
import Group from "components/Group";
import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { uploadFiles } from "helpers/uploadFiles";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { adminRoutes } from "constants/routes";
import FormButtons from "./FormButtons";

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [newApplication] = useNewBankingApplicationMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  const submit: OnSubmit = async (recipient, bankStatementFile) => {
    try {
      if (!recipient) {
        return showModal(Prompt, {
          headline: "Error",
          children: <p className="py-8">Failed to create recipient.</p>,
        });
      }

      const bankStatementURL = await uploadFiles(
        [bankStatementFile],
        "endow-profiles"
      );

      if (!bankStatementURL) {
        return showModal(Prompt, {
          headline: "Error",
          children: <p className="py-8">Failed to upload bank statement.</p>,
        });
      }

      const { id, details, currency } = recipient;
      //creating account return V1Recipient and doesn't have longAccount summary field
      const bankSummary = `${currency.toUpperCase()} account ending in ${details.accountNumber?.slice(
        -4 || "0000"
      )} `;
      await newApplication({
        wiseRecipientID: id.toString(),
        bankSummary,
        endowmentID: endowment_id,
        bankStatementFile: {
          name: "bank statement",
          publicUrl: bankStatementURL,
        },
      }).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: <p className="py-8">Banking details submitted for review!</p>,
      });
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    } finally {
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
        <BankDetails FormButtons={FormButtons} onSubmit={submit} />
      </Group>
    </>
  );
}
