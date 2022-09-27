import { AllianceEditValues as AV } from "pages/Admin/types";
import { DivContainer, Label, Submitter, TextInput } from "components/admin";
import AllianceSelection from "./AllianceSelection";
import MemberEditor from "./MemberEditor";
import useEditAlliance from "./useEditAlliance";

export default function Form() {
  const { editAlliance, isEditingMember } = useEditAlliance();
  return (
    <DivContainer>
      <TextInput title="proposal title" name="title" required />
      <TextInput<AV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label className="-mb-2 text-angel-grey">
        <span className="text-red-400">Remove</span> |{" "}
        <span className="text-orange">Edit</span> existing member
      </Label>
      <AllianceSelection />
      {(isEditingMember && (
        <Label className="mt-4 -mb-2 text-orange">Edit Member</Label>
      )) || <Label className="mt-4 -mb-2 text-green-400">Add member</Label>}
      <MemberEditor />
      <Submitter type="button" className="mt-4 " onClick={editAlliance}>
        Propose Changes
      </Submitter>
    </DivContainer>
  );
}
