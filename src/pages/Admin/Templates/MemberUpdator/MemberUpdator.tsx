import { Member } from "services/terra/admin/types";
import Addform from "./MemberAdder/AddForm";
import MemberAdder from "./MemberAdder/MemberAdder";
import GroupTitle from "./GroupTitle";
import MemberItem from "./MemberItem";
import useMemberUpdate from "./useMemberUpdate";

export type MemberCopy = Member & { is_deleted: boolean; is_added: boolean };
export default function UpdateForm() {
  const { membersCopy, submit_proposal } = useMemberUpdate();
  return (
    <div className="bg-white bg-opacity-10 p-3 rounded-md shadow-lg w-96">
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

      <MemberAdder>
        <Addform />
      </MemberAdder>
      <button
        type="button"
        onClick={submit_proposal}
        className="bg-blue-accent text-sm w-full py-2 rounded-md uppercase text-white font-bold mt-4"
      >
        Propose changes
      </button>
    </div>
  );
}
