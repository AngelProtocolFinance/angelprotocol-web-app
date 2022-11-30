import { FundSendValues as FS } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import Amount from "./Amount";
import useTransferFunds from "./useTransferFunds";

export default function Form() {
  const { transferFunds, isSubmitDisabled } = useTransferFunds();
  return (
    <FormContainer onSubmit={transferFunds}>
      <TextPrim<FS> label="Proposal Title" name="title" required />
      <TextArea<FS> label="Proposal description" name="description" required />
      <Amount />
      <TextPrim<FS> label="Recipient" name="recipient" required />
      <Submitter type="submit" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
