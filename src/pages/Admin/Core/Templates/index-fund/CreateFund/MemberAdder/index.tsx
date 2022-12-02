import { FundCreatorValues as V } from "pages/Admin/types";
import { GroupContainer, TextSec } from "components/admin";
import Member from "./Member";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember, newFundMembers } = useAddMember();

  return (
    <GroupContainer>
      {newFundMembers.length > 0 && (
        <div className="flex flex-wrap mb-4 gap-2">
          {newFundMembers.map((addr) => (
            <Member key={addr} address={addr} />
          ))}
        </div>
      )}
      <TextSec<V>
        label="Endowment address"
        name="newFundAddr"
        placeholder="juno123abc..."
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
