import { FundConfigValues as FV } from "pages/Admin/types";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import useConfigureFund from "./useConfigureFund";

export default function Form() {
  const { configureFund, isSubmitDisabled } = useConfigureFund();
  return (
    <FormContainer onSubmit={configureFund}>
      <TextPrim<FV> label="Proposal title" name="title" required />
      <TextArea<FV> label="Proposal description" name="description" required />
      <TextPrim<FV>
        label="Funding goal ($)"
        name="funding_goal"
        placeholder="$10,000"
      />
      <TextPrim<FV> label="Fund member limit" name="fund_member_limit" />
      <TextPrim<FV> label="Fund rotation" name="fund_rotation" />

      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
