import { FundSendValues as FS } from "@types-page/admin";
import TextInput from "pages/Admin/components/TextInput";
import Submitter from "../../Submitter";
import Amount from "./Amount";
import useTransferFunds from "./useTransferFunds";

export default function FundSendForm() {
  const { transferFunds, isSubmitDisabled } = useTransferFunds();
  return (
    <form
      onSubmit={transferFunds}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput<FS> title="Proposal Title" name="title" required />
      <TextInput<FS>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Amount />
      <TextInput<FS> title="recipient" name="recipient" required mono />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit Proposal
      </Submitter>
    </form>
  );
}
