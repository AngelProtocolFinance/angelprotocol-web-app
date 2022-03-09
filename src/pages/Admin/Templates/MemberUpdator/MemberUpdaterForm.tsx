import Loader from "components/Loader/Loader";
import TextInput from "../../components/TextInput";
import useInitMembers from "./useInitMembers";
import MemberItem from "./MemberItem";
import { MemberUpdatorValues as T } from "./memberUpdatorSchema";
import useUpdateMembers from "./useUpdateMembers";
import Label from "../../components/Label";
import MemberAdder from "./MemberAdder/MemberAdder";

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

      <button
        type="button"
        onClick={updateMembers}
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </div>
  );
}
