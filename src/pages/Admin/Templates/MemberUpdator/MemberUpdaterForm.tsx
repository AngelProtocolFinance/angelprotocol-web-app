import GroupTitle from "./GroupTitle";
import useInitForm from "./useInitForm";
import MemberItem from "./MemberItem";
import MemberAdder from "./MemberAdder/MemberAdder";
import TextInput from "./TextInput";
import useUpdateMembers from "./useUpdateMembers";
export default function MemberUpdateForm() {
  const { membersCopy } = useInitForm();
  const { updateMembers } = useUpdateMembers();
  return (
    <div className="w-full p-6 rounded-md grid content-start bg-white bg-opacity-5 rounded-md shadow-inner">
      <TextInput title="title" name="title" />
      <TextInput title="description" name="description" wide />
      <div className="mb-7 p-3 rounded-md bg-white bg-opacity-5">
        <GroupTitle
          title="Remove existing member"
          colorClass="text-red-300 font-bold"
        />
        <div className="flex flex-col gap-2 mb-2">
          {membersCopy.map((member) => (
            <MemberItem key={member.addr} {...member} />
          ))}
        </div>
      </div>

      <MemberAdder />

      <button
        type="button"
        onClick={updateMembers}
        className="justify-self-center bg-angel-blue text-sm p-2 rounded-md uppercase text-white font-bold mt-4"
      >
        Propose changes
      </button>
    </div>
  );
}
