import TextInput from "pages/Admin/components/TextInput";
import { AllianceEditValues as AV } from "../alllianceEditSchema";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember } = useAddMember();

  return (
    <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3 grid">
      <TextInput<AV> title="Member name" name="name" plain mono required />
      <TextInput<AV>
        title="Wallet address"
        name="wallet"
        placeholder="terra123abc..."
        plain
        required
        mono
      />
      <TextInput<AV>
        title="Logo url"
        name="logo"
        placeholder="https://mysite/logo.jpg"
        plain
        required
        mono
      />
      <TextInput<AV>
        title="Website"
        name="website"
        placeholder="https://mysite.com"
        plain
        required
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
