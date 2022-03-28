import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import useConfigureFund from "./useConfigureFund";

export default function FundConfigForm() {
  const { configureFund } = useConfigureFund();
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="Proposal Title" name="title" required />
      <TextInput
        title="proposal description"
        name="description"
        wide
        required
      />

      <Submitter type="button" onClick={configureFund} _classes="mt-4">
        Propose changes
      </Submitter>
    </div>
  );
}
