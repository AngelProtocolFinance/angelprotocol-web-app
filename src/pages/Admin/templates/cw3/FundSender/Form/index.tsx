import { FormValues as FV } from "../types";
import { FundSendValues as FS } from "pages/Admin/types";
import { Chain } from "types/aws";
import TokenField from "components/TokenField";
import { FormContainer, Submitter } from "components/admin";
import { Field } from "components/form";
import useTransferFunds from "./useTransferFunds";

export default function Form(props: Chain) {
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
      <TokenField<FV, "token">
        name="token"
        label="Amount"
        tokens={props.tokens.map((t) => ({ ...t, amount: "0" }))}
        classes={{ inputContainer: "bg-orange-l6 dark:bg-blue-d7" }}
        withBalance
      />

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
