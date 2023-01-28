import { MemberUpdatorValues as T } from "pages/Admin/types";
import { GroupContainer } from "components/admin";
import { TextInput } from "components/form";
import useAddMember from "./useAddMember";

export default function Adder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="grid">
      <TextInput<T>
        classes="field-group-admin-sec"
        label="Wallet address"
        name="addr"
        placeholder="juno123abc..."
      />
      <TextInput<T>
        classes="field-group-admin-sec"
        label="Weight"
        placeholder="juno123abc..."
        name="weight"
      />
      <button
        onClick={addMember}
        type="button"
        className="mt-2 font-bold justify-self-end text-xs uppercase text-green dark:text-green-l2 hover:text-green-l2 hover:dark:text-green-l3"
      >
        + add member
      </button>
    </GroupContainer>
  );
}
