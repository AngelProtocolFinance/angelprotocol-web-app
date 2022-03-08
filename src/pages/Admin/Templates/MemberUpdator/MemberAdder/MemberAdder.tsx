import { MemberUpdatorValues as T } from "../memberUpdatorSchema";
import TextInput from "../../components/TextInput";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember } = useAddMember();
  return (
    <div className="mb-2 grid p-3 rounded-md bg-light-grey shadow-inner-white-grey">
      <TextInput<T>
        title="wallet address"
        name="addr"
        placeholder="terra123abc..."
        mono
        plain
      />
      <TextInput<T>
        title="weight"
        placeholder="terra123abc..."
        name="weight"
        mono
        plain
      />
      <button
        onClick={addMember}
        type="button"
        className="font-heading font-bold justify-self-end text-xs uppercase text-green-400 hover:text-green-300"
      >
        + add member
      </button>
    </div>
  );
}
