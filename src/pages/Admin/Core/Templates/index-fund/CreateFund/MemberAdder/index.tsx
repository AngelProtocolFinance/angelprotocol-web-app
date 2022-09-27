import { FundCreatorValues as V } from "pages/Admin/types";
import { TextInput } from "components/admin";
import Member from "./Member";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember, newFundMembers } = useAddMember();

  return (
    <div className="shadow-inner-white bg-gray-l2 rounded-md p-3 grid">
      {newFundMembers.length > 0 && (
        <div className="flex flex-wrap mb-4 gap-2">
          {newFundMembers.map((addr) => (
            <Member key={addr} address={addr} />
          ))}
        </div>
      )}
      <TextInput<V>
        title="endowment address"
        name="newFundAddr"
        placeholder="juno123abc..."
        plain
        mono
      />
      <button
        type="button"
        onClick={addMember}
        className="justify-self-end text-green-400 font-bold text-sm"
      >
        + add member
      </button>
    </div>
  );
}
