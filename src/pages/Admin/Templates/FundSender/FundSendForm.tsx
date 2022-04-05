import TextInput from "pages/Admin/components/TextInput";
import Submitter from "../Submitter";
import { FundSendValues as FS } from "./fundSendSchema";

export default function FundSendForm() {
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput<FS> title="Proposal Title" name="title" required />
      <TextInput<FS>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Submitter type="button" onClick={() => {}} _classes="mt-4">
        Propose changes
      </Submitter>
    </div>
  );
}
