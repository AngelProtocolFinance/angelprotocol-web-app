import { FundCreatorValues as V } from "pages/Admin/types";
import { TextInput } from "components/admin";
import MemberItem from "./MemberItem";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember, newFundMembers } = useAddMember();

  return (
    <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3 grid">
      {newFundMembers.length > 0 && (
        <div className="flex flex-wrap mb-4 gap-2">
          {newFundMembers.map((addr) => (
            <MemberItem key={addr} address={addr} />
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
