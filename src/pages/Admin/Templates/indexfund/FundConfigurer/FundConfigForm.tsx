import { FundConfigValues as FV } from "pages/Admin/types";
import { FormContainer } from "pages/Admin/common/TemplateContainer";
import Submitter from "../../../common/Submitter";
import TextInput from "../../../common/TextInput";
import useConfigureFund from "./useConfigureFund";

export default function FundConfigForm() {
  const { configureFund, isSubmitDisabled } = useConfigureFund();
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
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
