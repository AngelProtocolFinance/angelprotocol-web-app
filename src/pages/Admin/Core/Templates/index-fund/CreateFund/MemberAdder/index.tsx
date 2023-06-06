import { FormValues } from "../types";
import { Field } from "components/form";
import { GroupContainer } from "../../../../../components";
import Member from "./Member";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember, newFundMembers } = useAddMember();

  return (
    <GroupContainer>
      {newFundMembers.length > 0 && (
        <div className="flex flex-wrap mb-4 gap-2">
          {newFundMembers.map((addr) => (
            <Member key={addr} id={addr} />
          ))}
        </div>
      )}
      <Field<FormValues>
        classes="field-admin-sec"
        label="Endowment id"
        name="newFundMemberId"
        placeholder="1"
      />
      <button
        type="button"
        onClick={addMember}
        className="justify-self-end text-green-l1 font-bold text-sm"
      >
        + add member
      </button>
    </GroupContainer>
  );
}
