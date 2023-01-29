import { FundSendValues as FS } from "pages/Admin/types";
import { FormContainer, Submitter } from "components/admin";
import { Field } from "components/form";
import Amount from "./Amount";
import useTransferFunds from "./useTransferFunds";

export default function Form() {
  const { transferFunds, isSubmitDisabled } = useTransferFunds();
  return (
    <FormContainer onSubmit={transferFunds}>
      <Field<FS>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<FS, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Amount />
      <Field<FS>
        classes="field-admin"
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
