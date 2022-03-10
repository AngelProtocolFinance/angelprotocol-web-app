import Loader from "components/Loader/Loader";
import TextInput from "../../components/TextInput";
import Label from "../../components/Label";
import Submitter from "../Submitter";
import MemberAdder from "./MemberAdder/MemberAdder";
import MemberItem from "./MemberItem";
import { MemberUpdatorValues as T } from "./memberUpdatorSchema";
import useUpdateMembers from "./useUpdateMembers";
import useInitMembers from "./useInitMembers";

export default function MemberUpdateForm() {
  const { apCW4Members, isMembersLoading } = useInitMembers();
  const { updateMembers } = useUpdateMembers();
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput<T> title="proposal title" name="title" required />
      <TextInput<T>
        title="proposal description"
        name="description"
        wide
        required
      />

      <Label text="remove member" textColor="text-red-400" />
      <div className="mb-7 p-3 rounded-md bg-light-grey shadow-inner-white-grey">
        {(isMembersLoading && (
          <Loader
            gapClass="gap-1"
            widthClass="w-2"
            bgColorClass="bg-angel-grey"
          />
        )) || (
          <div className="flex flex-col gap-2 mb-2">
            {apCW4Members.map((member) => (
              <MemberItem key={member.addr} {...member} />
            ))}
          </div>
        )}
      </div>

      <Label text="add member" textColor="text-green-400" />
      <MemberAdder />

      <Submitter
        type="button"
        onClick={updateMembers}
        _text="Propose Changes"
        _classes="mt-4"
      />
    </div>
  );
}
