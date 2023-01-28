import { FundUpdateValues as T } from "pages/Admin/types";
import { GroupContainer } from "components/admin";
import { TextInput } from "components/form";
import useAddMember from "./useAddMember";

export default function Adder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="mb-2 grid">
      <TextInput<T>
        classes="field-group-admin-sec"
        label="Endowment Address"
        name="newMemberAddr"
        placeholder="juno123abc..."
      />
      <button
        onClick={addMember}
        type="button"
        className="font-heading font-bold justify-self-end text-xs uppercase text-green hover:text-green-l2"
      >
        + add member
      </button>
    </GroupContainer>
  );
}
