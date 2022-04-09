import Label from "pages/Admin/components/Label";
import { DivContainer } from "pages/Admin/components/TemplateContainer";
import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import AllianceSelection from "./AllianceSelection/AllianceSelection";
import { AllianceEditValues as AV } from "./alllianceEditSchema";
import MemberEditor from "./MemberEditor/MemberEditor";
import useEditAlliance from "./useEditAlliance";

export default function AllianceEditForm() {
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
        <span className="text-angel-orange">Edit</span> existing member
      </Label>
      <AllianceSelection />
      {(isEditingMember && (
        <Label className="mt-4 -mb-2 text-angel-orange">Edit Member</Label>
      )) || <Label className="mt-4 -mb-2 text-green-400">Add member</Label>}
      <MemberEditor />
      <Submitter type="button" className="mt-4 " onClick={editAlliance}>
        Propose Changes
      </Submitter>
    </DivContainer>
  );
}
