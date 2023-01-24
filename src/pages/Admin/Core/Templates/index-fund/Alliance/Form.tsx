import { AllianceEditValues as AV } from "pages/Admin/types";
import { DivContainer, Submitter, TextArea, TextPrim } from "components/admin";
import { Label } from "components/form";
import AllianceSelection from "./AllianceSelection";
import MemberEditor from "./MemberEditor";
import useEditAlliance from "./useEditAlliance";

export default function Form() {
  const { editAlliance, isEditingMember } = useEditAlliance();
  return (
    <DivContainer>
      <TextPrim label="Proposal title" name="title" required />
      <TextArea<AV> label="Proposal description" name="description" required />
      <Label className="-mb-4">
        <span className="text-red-l1">Remove</span> |{" "}
        <span className="text-orange">Edit</span> existing member
      </Label>
      <AllianceSelection />
      {(isEditingMember && (
        <Label className="mt-4 -mb-4 text-orange">Edit Member</Label>
      )) || <Label className="mt-4 -mb-4 text-green-l1">Add member</Label>}
      <MemberEditor />
      <Submitter type="button" className="mt-4 " onClick={editAlliance}>
        Propose Changes
      </Submitter>
    </DivContainer>
  );
}
