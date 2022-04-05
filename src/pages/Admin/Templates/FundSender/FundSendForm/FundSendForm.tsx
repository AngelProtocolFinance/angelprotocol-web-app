import TextInput from "pages/Admin/components/TextInput";
import Submitter from "../../Submitter";
import { FundSendValues as FS } from "../fundSendSchema";
import Amount from "./Amount";

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
      <Amount />
      <TextInput<FS> title="receipient" name="description" required mono />
      <Submitter type="button" onClick={() => {}} _classes="mt-4">
        Propose changes
      </Submitter>
    </div>
  );
}
