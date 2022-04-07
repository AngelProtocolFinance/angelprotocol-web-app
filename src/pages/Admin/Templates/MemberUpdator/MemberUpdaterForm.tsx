import TextInput from "../../components/TextInput";
import Label from "../../components/Label";
import Submitter from "../Submitter";
import MemberAdder from "./MemberAdder/MemberAdder";
import MemberItem from "./MemberItem";
import { MemberUpdatorValues as T } from "./memberUpdatorSchema";
import useUpdateMembers from "./useUpdateMembers";

export default function MemberUpdateForm() {
  const { updateMembers, apCW4Members } = useUpdateMembers();
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput<T> title="proposal title" name="title" required />
      <TextInput<T>
        title="proposal description"
        name="description"
        wide
        required
      />

      <Label _classes="text-red-400">remove member</Label>
      <div className="mb-7 p-3 rounded-md bg-light-grey shadow-inner-white-grey">
        <div className="flex flex-col gap-2 mb-2">
          {apCW4Members.map((member) => (
            <MemberItem key={member.addr} {...member} />
          ))}
        </div>
      </div>

      <Label _classes="text-green-400">add member</Label>
      <MemberAdder />

      <Submitter type="button" onClick={updateMembers} _classes="mt-4">
        Submit Proposal
      </Submitter>
    </div>
  );
}
