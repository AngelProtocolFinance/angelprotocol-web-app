import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import { CW3ConfigValues as CV } from "./cw3ConfigSchema";
import useConfigureCW3 from "./useConfigureCW3";

export default function CW3ConfigForm() {
  const { configureFund, isSubmitDisabled } = useConfigureCW3();
  return (
    <form
      onSubmit={configureFund}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput<CV> title="Proposal Title" name="title" required />
      <TextInput<CV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<CV>
        title="pass threshold (%)"
        name="threshold"
        required
        mono
      />
      <TextInput<CV>
        title="voting period (blocks)"
        name="height"
        required
        mono
      />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Propose changes
      </Submitter>
    </form>
  );
}
