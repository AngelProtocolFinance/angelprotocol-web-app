import Label from "pages/Admin/components/Label";
import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import AllianceSelection from "./AllianceSelection/AllianceSelection";
import { AllianceEditValues as AV } from "./alllianceEditSchema";
import MemberEditor from "./MemberEditor/MemberEditor";
import useEditAlliance from "./useEditAlliance";

export default function AllianceEditForm() {
  const { editAlliance, isEditingMember } = useEditAlliance();
  return (
    <form className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="proposal title" name="title" required />
      <TextInput<AV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label>
        <span className="text-red-400">Remove</span> |{" "}
        <span className="text-angel-orange">Edit</span> existing member
      </Label>
      <AllianceSelection />
      {(isEditingMember && (
        <Label _classes="mt-4 text-angel-orange">Edit Member</Label>
      )) || <Label _classes="mt-4 text-green-400">Add member</Label>}
      <MemberEditor />
      <Submitter type="button" _classes="mt-4" onClick={editAlliance}>
        Propose Changes
      </Submitter>
    </form>
  );
}
