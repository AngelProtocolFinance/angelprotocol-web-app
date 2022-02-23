import { addMember as _addMember } from "services/admin/memberSlice";
import GroupTitle from "../GroupTitle";
import TextInput from "../TextInput";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember } = useAddMember();
  return (
    <div className="mb-2 grid p-3 rounded-md shadow-inner bg-white bg-opacity-5">
      <GroupTitle
        title="Add new member"
        colorClass="text-green-300 font-bold"
      />
      <TextInput title="wallet address" name="addr" mono />
      <TextInput title="weight" name="weight" mono />
      <button
        onClick={addMember}
        type="button"
        className="font-heading font-bold justify-self-end bg-green-300 hover:bg-green-400 p-3 rounded-md text-xs uppercase text-white"
      >
        + add member
      </button>
    </div>
  );
}
