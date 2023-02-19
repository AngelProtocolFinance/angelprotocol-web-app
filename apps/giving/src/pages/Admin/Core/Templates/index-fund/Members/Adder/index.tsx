import { GroupContainer } from "@ap/components/admin";
import { Field } from "@ap/components/form";
import { FundUpdateValues as T } from "@ap/types/admin";
import useAddMember from "./useAddMember";

export default function Adder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="mb-2 grid">
      <Field<T>
        classes="field-admin-sec"
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
