import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import { addMember as _addMember } from "services/admin/memberSlice";
import GroupTitle from "../GroupTitle";
import { MemberUpdatorValues } from "../memberUpdatorSchema";
import TextInput from "../TextInput";

export default function MemberAdder() {
  const dispatch = useSetter();
  const membersCopy = useGetter((state) => state.admin.members);
  const { trigger, getValues, setError, resetField } =
    useFormContext<MemberUpdatorValues>();

  async function addMember() {
    const isValid = await trigger(["addr", "weight"], { shouldFocus: true });
    if (!isValid) return;

    const newMemberAddr = getValues("addr");
    const newMemberWeight = getValues("weight");
    const existingMember = membersCopy.find(
      (member) => member.addr === newMemberAddr
    );

    if (existingMember) {
      setError("addr", { message: "address already added or existing" });
    } else {
      dispatch(_addMember({ weight: +newMemberWeight, addr: newMemberAddr }));
      resetField("addr");
      resetField("weight");
    }
  }

  return (
    <div className="bg-white-grey mb-2 grid">
      <GroupTitle
        title="Add new member"
        colorClass="text-green-200 font-bold"
      />
      <TextInput title="wallet address" name="addr" />
      <TextInput title="weight" name="weight" />
      <button
        onClick={addMember}
        type="button"
        className="font-heading font-bold justify-self-end bg-green-200 hover:bg-white hover:text-green-300 bg-opacity-40 p-3 rounded-md text-xs uppercase text-white"
      >
        + add member
      </button>
    </div>
  );
}
