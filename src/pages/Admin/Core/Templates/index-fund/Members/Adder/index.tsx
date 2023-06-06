import { FormValues as FV } from "../types";
import { Field } from "components/form";
import { GroupContainer } from "../../../../../components";
import useAddMember from "./useAddMember";

export default function Adder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="mb-2 grid">
      <Field<FV>
        classes="field-admin-sec"
        label="Endowment ID"
        name="newMemberId"
        placeholder="1"
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
