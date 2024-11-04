import BankDetails, { type OnSubmit } from "components/BankDetails";
import Group from "components/Group";
import Prompt from "components/Prompt";
import { adminRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { uploadFile } from "helpers/uploadFile";
import { ChevronLeft } from "lucide-react";
import { useAdminContext } from "pages/Admin/Context";
import { Link, useNavigate } from "react-router-dom";
import { useNewBankingApplicationMutation } from "services/aws/banking-applications";
import FormButtons from "./FormButtons";

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [newApplication] = useNewBankingApplicationMutation();
  const { handleError, displayError } = useErrorContext();
  const { showModal } = useModalContext();
  const navigate = useNavigate();

  const submit: OnSubmit = async (recipient, bankStatementFile) => {
    try {
      const bankStatement = await uploadFile(bankStatementFile, "endow-reg");
      if (!bankStatement) {
        return displayError("Failed to upload bank statement");
      }

      const { id, details, currency } = recipient;
      //creating account return V1Recipient and doesn't have longAccount summary field
      const bankSummary = `${currency.toUpperCase()} account ending in ${
        details.accountNumber?.slice(-4) || "0000"
      } `;
      await newApplication({
        wiseRecipientID: id.toString(),
        bankSummary,
        endowmentID: endowment_id,
        bankStatementFile: bankStatement,
      }).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: <p className="py-8">Banking details submitted for review!</p>,
      });

      navigate(`../${adminRoutes.banking}`);
    } catch (error) {
      handleError(error, { context: "submitting banking application" });
    }
  };

  return (
    <>
      <Link
        to={".."}
        className="flex items-center gap-1 mb-4 text-blue hover:text-blue-l1 text-sm uppercase"
      >
        <ChevronLeft size={18} />
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
