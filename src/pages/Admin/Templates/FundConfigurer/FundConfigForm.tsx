import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import { FundConfigValues as FV } from "./fundconfigSchema";
import useConfigureFund from "./useConfigureFund";

export default function FundConfigForm() {
  const { configureFund, isSubmitDisabled } = useConfigureFund();
  return (
    <form
      onSubmit={configureFund}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
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
    </form>
  );
}
