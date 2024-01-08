import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "pages/Admin/Context";
import { useNewBankingApplicationMutation } from "services/aws/banking-applications";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import BankDetails, { type OnSubmit } from "components/BankDetails";
import Group from "components/Group";
import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { getFilePreviews } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { adminRoutes } from "constants/routes";
import FormButtons from "./FormButtons";

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [newApplication] = useNewBankingApplicationMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const navigate = useNavigate();

  const submit: OnSubmit = async (recipient, bankStatementFile) => {
    try {
      const { bankStatement } = await getFilePreviews({
        bankStatement: { previews: [], files: [bankStatementFile] },
      });

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
          publicUrl: bankStatement[0].publicUrl,
        },
      }).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: <p className="py-8">Banking details submitted for review!</p>,
      });

      navigate(`../${adminRoutes.banking}`);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
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
