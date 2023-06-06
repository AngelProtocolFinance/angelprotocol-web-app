import { FormValues as FV } from "../types";
import { Chain } from "types/tx";
import TokenField from "components/TokenField";
import { Field } from "components/form";
import { FormContainer, Submitter } from "../../../../components";
import useTransferFunds from "./useTransferFunds";

export default function Form(props: Chain) {
  const { transferFunds, isSubmitDisabled } = useTransferFunds();
  return (
    <FormContainer onSubmit={transferFunds}>
      <Field<FV>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<FV, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <TokenField<FV, "token">
        name="token"
        label="Amount"
        tokens={[props.native_currency]
          .concat(props.tokens)
          .map((t) => ({ ...t, amount: "0" }))}
        classes={{ inputContainer: "bg-orange-l6 dark:bg-blue-d7" }}
        withBalance
      />

      <Field<FV>
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
