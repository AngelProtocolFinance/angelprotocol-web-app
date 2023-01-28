import { FundSendValues as FS } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea } from "components/admin";
import { TextInput } from "components/form";
import Amount from "./Amount";
import useTransferFunds from "./useTransferFunds";

export default function Form() {
  const { transferFunds, isSubmitDisabled } = useTransferFunds();
  return (
    <FormContainer onSubmit={transferFunds}>
      <TextInput<FS>
        classes="field-group-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<FS> label="Proposal description" name="description" required />
      <Amount />
      <TextInput<FS>
        classes="field-group-admin"
        label="Recipient"
        name="recipient"
        required
      />
      <Submitter type="submit" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
