import TextInput from "pages/Admin/components/TextInput";
import { AllianceEditValues as AV } from "../alllianceEditSchema";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember } = useAddMember();

  return (
    <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3 grid">
      <TextInput<AV>
        title="Wallet address"
        name="walletAddr"
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
