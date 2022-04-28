import { MemberUpdatorValues as T } from "@types-page/admin";
import { GroupContainer } from "pages/Admin/components/TemplateContainer";
import TextInput from "../../../components/TextInput";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="mb-2 grid">
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
    </GroupContainer>
  );
}
