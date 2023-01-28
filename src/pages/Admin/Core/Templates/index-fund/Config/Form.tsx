import { FundConfigValues as FV } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea } from "components/admin";
import { TextInput } from "components/form";
import useConfigureFund from "./useConfigureFund";

export default function Form() {
  const { configureFund, isSubmitDisabled } = useConfigureFund();
  return (
    <FormContainer onSubmit={configureFund}>
      <TextInput<FV>
        classes="field-group-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<FV> label="Proposal description" name="description" required />
      <TextInput<FV>
        classes="field-group-admin"
        label="Funding goal ($)"
        name="funding_goal"
        placeholder="$10,000"
      />
      <TextInput<FV>
        classes="field-group-admin"
        label="Fund member limit"
        name="fund_member_limit"
      />
      <TextInput<FV>
        classes="field-group-admin"
        label="Fund rotation"
        name="fund_rotation"
      />

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
