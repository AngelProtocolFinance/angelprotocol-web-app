import Label from "pages/Admin/components/Label";
import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import AllianceSelection from "./AllianceSelection/AllianceSelection";
import { AllianceEditValues as AV } from "./alllianceEditSchema";
import MemberAdder from "./MemberAdder/MemberAdder";

export default function AllianceEditForm() {
  return (
    <form
      onSubmit={() => {}}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
      <TextInput title="proposal title" name="title" required />
      <TextInput<AV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label _classes="text-red-400">Remove existing member</Label>
      <AllianceSelection />
      <Label _classes="mt-4 text-green-400">Add member</Label>
      <MemberAdder />
      <Submitter type="submit" _classes="mt-4">
        Propose Changes
      </Submitter>
    </form>
  );
}
