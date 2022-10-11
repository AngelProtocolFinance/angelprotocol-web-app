import { FundConfigValues as FV } from "pages/Admin/types";
import { FormContainer, Submitter, TextInput } from "components/admin";
import useConfigureFund from "./useConfigureFund";

export default function Form() {
  const { configureFund, isSubmitDisabled, cw3MemberCount } =
    useConfigureFund();
  return (
    <FormContainer onSubmit={configureFund}>
      <TextInput<FV> title="Proposal Title" name="title" required />
      <TextInput<FV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<FV>
        title="funding goal ($)"
        name="funding_goal"
        mono
        placeholder="$10,000"
      />
      <TextInput<FV> title="fund member limit" name="fund_member_limit" mono />
      <TextInput<FV> title="fund rotation" name="fund_rotation" mono />

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit{cw3MemberCount > 1 ? "proposal" : ""}
      </Submitter>
    </FormContainer>
  );
}
