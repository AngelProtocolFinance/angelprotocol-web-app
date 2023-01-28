import { MemberUpdatorValues as T } from "pages/Admin/types";
import { DivContainer, Submitter, TextArea } from "components/admin";
import { Field, Label } from "components/form";
import Adder from "./Adder";
import Member from "./Member";
import useUpdateMembers from "./useUpdateMembers";

export default function Form() {
  const { updateMembers, apCW4Members } = useUpdateMembers();
  return (
    <DivContainer>
      <Field<T>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<T> label="Proposal description" name="description" required />

      <Label className="text-red dark:text-red-l2 -mb-3">Remove member</Label>
      <div className="p-3 rounded border border-prim bg-orange-l6 dark:bg-blue-d7">
        <div className="flex flex-col gap-2 mb-2">
          {apCW4Members.map((member) => (
            <Member key={member.addr} {...member} />
          ))}
        </div>
      </div>

      <Label className="text-green dark:text-green-l2 -mb-3">Add member</Label>
      <Adder />

      <Submitter type="button" onClick={updateMembers}>
        Submit
      </Submitter>
    </DivContainer>
  );
}
