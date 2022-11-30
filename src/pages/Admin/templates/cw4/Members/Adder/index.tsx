import { MemberUpdatorValues as T } from "pages/Admin/types";
import { GroupContainer, TextSec } from "components/admin";
import useAddMember from "./useAddMember";

export default function Adder() {
  const { addMember } = useAddMember();
  return (
    <GroupContainer className="mb-2 grid">
      <TextSec<T>
        label="Wallet address"
        name="addr"
        placeholder="juno123abc..."
        classes={{ container: "mb-6" }}
      />
      <TextSec<T>
        label="Weight"
        placeholder="juno123abc..."
        name="weight"
        classes={{ container: "mb-6" }}
      />
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
