import { FundConfigValues as FV } from "pages/Admin/types";
import { FormContainer, Submitter } from "components/admin";
import { Field } from "components/form";
import useConfigureFund from "./useConfigureFund";

export default function Form() {
  const { configureFund, isSubmitDisabled } = useConfigureFund();
  return (
    <FormContainer onSubmit={configureFund}>
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
      <Field<FV>
        classes="field-admin"
        label="Funding goal ($)"
        name="funding_goal"
        placeholder="$10,000"
      />
      <Field<FV>
        classes="field-admin"
        label="Fund member limit"
        name="fund_member_limit"
      />
      <Field<FV>
        classes="field-admin"
        label="Fund rotation"
        name="fund_rotation"
      />

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
