import { MemberUpdatorValues as T } from "pages/Admin/types";
import { GroupContainer, TextSec } from "components/admin";
import useAddMember from "./useAddMember";

export default function Adder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="grid">
      <TextSec<T>
        label="Wallet address"
        name="addr"
        placeholder="juno123abc..."
      />
      <TextSec<T> label="Weight" placeholder="juno123abc..." name="weight" />
      <button
        onClick={addMember}
        type="button"
        className="mt-2 font-bold justify-self-end text-xs uppercase text-green dark:text-green-l2 hover:text-green-l2 hover:dark:text-green-l3"
      >
        + add member
      </button>
    </GroupContainer>
  );
}
