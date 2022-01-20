import { Member } from "services/terra/admin/types";
import Addform from "./AddForm";
import GroupTitle from "./GroupTitle";
import MemberItem from "./MemberItem";
import useUpdateForm from "./useUpdateForm";

export type MemberCopy = Member & { is_deleted: boolean; is_added: boolean };
export default function UpdateForm() {
  const { membersCopy, get_updator, add_member, submit_proposal } =
    useUpdateForm();
  return (
    <div className="bg-white bg-opacity-10 p-3 rounded-md shadow w-96">
      <div className="border-4 p-2 border-opacity-20 rounded-md mb-2">
        <GroupTitle title="Remove existing member" />
        <div className="flex flex-col gap-2 mb-2">
          {membersCopy.map((member) => (
            <MemberItem
              key={member.addr}
              {...member}
              onClick={get_updator(member)}
            />
          ))}
        </div>
      </div>

      <Addform adder={add_member} />
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
