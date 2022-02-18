import GroupTitle from "../GroupTitle";
import useAddMember from "./useAddMember";
import TextInput from "./TextInput";

export default function Addform() {
  const { addMember } = useAddMember();
  return (
    <form onSubmit={addMember} className="mb-2 grid" autoComplete="off">
      <GroupTitle
        title="Add new member"
        colorClass="text-green-200 font-bold"
      />
      <TextInput title="wallet address" name="addr" />
      <TextInput title="weight" name="weight" />
      <button
        type="submit"
        className="font-heading font-bold justify-self-end bg-green-200 hover:bg-white hover:text-green-300 bg-opacity-40 p-3 rounded-md text-xs uppercase text-white"
      >
        + add member
      </button>
    </form>
  );
}
