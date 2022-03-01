import TextInput from "pages/Admin/TextInput";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFundMember } from "services/admin/fundMemberSlice";
import { useGetter } from "store/accessors";
import { FundCreatorValues as V } from "../fundCreatorSchema";
import MemberItem from "./MemberItem";

export default function MemberAdder() {
  const { getValues, setError, resetField } = useFormContext<V>();
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const dispatch = useDispatch();

  function addMember() {
    const newFundMemberAddr = getValues("newFundAddr");
    const isMemberExisting = fundMembers.indexOf(newFundMemberAddr) !== -1;

    if (isMemberExisting) {
      setError(
        "newFundAddr",
        { message: "address already added" },
        { shouldFocus: true }
      );
      return;
    }
    dispatch(addFundMember(newFundMemberAddr));
    resetField("newFundAddr");
  }

  return (
    <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3 grid">
      {fundMembers.length > 0 && (
        <div className="flex flex-wrap mb-4 gap-2">
          {fundMembers.map((addr) => (
            <MemberItem key={addr} address={addr} />
          ))}
        </div>
      )}

      <TextInput<V>
        title="endowment address"
        name="newFundAddr"
        placeholder="terra123abc..."
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
