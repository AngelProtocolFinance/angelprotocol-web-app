import { MemberUpdatorValues as T } from "pages/Admin/types";
import { DivContainer, Label, Submitter, TextInput } from "components/admin";
import Adder from "./Adder";
import Member from "./Member";
import useUpdateMembers from "./useUpdateMembers";

export default function Form() {
  const { updateMembers, apCW4Members } = useUpdateMembers();
  return (
    <DivContainer>
      <TextInput<T> title="proposal title" name="title" required />
      <TextInput<T>
        title="proposal description"
        name="description"
        wide
        required
      />

      <Label className="text-red-400 -mb-2">remove member</Label>
      <div className="mb-7 p-3 rounded-md bg-gray-l2 shadow-inner-white">
        <div className="flex flex-col gap-2 mb-2">
          {apCW4Members.map((member) => (
            <Member key={member.addr} {...member} />
          ))}
        </div>
      </div>

      <Label className="text-green-400 -mb-2">add member</Label>
      <Adder />

      <Submitter type="button" onClick={updateMembers} _classes="mt-4">
        Submit Proposal
      </Submitter>
    </DivContainer>
  );
}
