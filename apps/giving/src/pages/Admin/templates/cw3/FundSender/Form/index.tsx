import { FormContainer, Submitter } from "@ap/components/admin";
import { Field } from "@ap/components/form";
import { FundSendValues as FS } from "@ap/types/admin";
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
