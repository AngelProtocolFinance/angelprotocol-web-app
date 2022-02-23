import GroupTitle from "./GroupTitle";
import useInitForm from "./useInitForm";
import MemberItem from "./MemberItem";
import MemberAdder from "./MemberAdder/MemberAdder";
import TextInput from "./TextInput";
export default function MemberUpdateForm() {
  const { membersCopy } = useInitForm();
  return (
    <div className="bg-light-grey p-3 rounded-md shadow-inner w-96">
      <div className="mb-7">
        <GroupTitle
          title="Remove existing member"
          colorClass="text-red-200 font-bold"
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
        onClick={() => {}}
        className="bg-blue-accent text-sm w-full py-2 rounded-md uppercase text-white font-bold mt-4"
      >
        Propose changes
      </button>
    </div>
  );
}
