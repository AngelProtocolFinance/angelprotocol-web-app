import { FundUpdateValues as T } from "pages/Admin/types";
import { GroupContainer } from "pages/Admin/components/TemplateContainer";
import TextInput from "../../../components/TextInput";
import useAddMember from "./useAddMember";

export default function MemberAdder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="mb-2 grid">
      <TextInput<T>
        title="Endowment Address"
        name="newMemberAddr"
        placeholder="juno123abc..."
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
