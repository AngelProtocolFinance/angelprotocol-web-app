import { useModalContext } from "contexts/ModalContext";
import { ErrorStatus } from "components/Status";
import { DivContainer } from "components/admin";
import { isEmpty } from "helpers";
import { useAdminResources } from "../../../Guard";
import AddForm from "./Adder";
import Member from "./Member";

export default function Form() {
  const { members } = useAdminResources();
  const { showModal } = useModalContext();
  return (
    <DivContainer>
      <h3>Members</h3>
      <div className="p-3 rounded border border-prim bg-orange-l6 dark:bg-blue-d7">
        {isEmpty(members) ? (
          <ErrorStatus classes="text-sm">No members found</ErrorStatus>
        ) : (
          <div className="flex flex-col gap-2">
            {members.map((m) => (
              <Member key={m} address={m} />
            ))}
          </div>
        )}
      </div>

      <button
        className="btn-outline-filled justify-self-end text-sm py-1 -mt-2"
        onClick={() => showModal(AddForm, { address: "", action: "add" })}
      >
        add member
      </button>
    </DivContainer>
  );
}
