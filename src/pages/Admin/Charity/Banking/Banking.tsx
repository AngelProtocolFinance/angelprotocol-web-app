import BankDetails, { type OnSubmit } from "components/BankDetails";
import Group from "components/Group";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { toFileName } from "helpers/uploadFile";
import { ChevronLeft } from "lucide-react";
import { useAdminContext } from "pages/Admin/Context";
import { Link, useNavigate } from "react-router-dom";
import { useNewBankingApplicationMutation } from "services/aws/banking-applications";
import FormButtons from "./FormButtons";

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [newApplication] = useNewBankingApplicationMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const navigate = useNavigate();

  const submit: OnSubmit = async (recipient, bankStatementUrl) => {
    try {
      const { id, details, currency } = recipient;
      //creating account return V1Recipient and doesn't have longAccount summary field
      const bankSummary = `${currency.toUpperCase()} account ending in ${
        details.accountNumber?.slice(-4) || "0000"
      } `;
      await newApplication({
        wiseRecipientID: id.toString(),
        bankSummary,
        endowmentID: endowment_id,
        bankStatementFile: {
          name: toFileName(bankStatementUrl) ?? "bank statement",
          publicUrl: bankStatementUrl,
        },
      }).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: <p className="py-8">Banking details submitted for review!</p>,
      });

      navigate("..");
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
