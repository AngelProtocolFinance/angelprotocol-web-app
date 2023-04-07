import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { ErrorStatus } from "components/Status";
import { DivContainer, Submitter } from "components/admin";
import { isEmpty } from "helpers";
import AddForm from "./Adder";
import Member from "./Member";

export default function Form() {
  const { members } = useAdminResources();
  const { showModal } = useModalContext();
  return (
    <DivContainer>
      <div className="p-3 rounded border border-prim bg-orange-l6 dark:bg-blue-d7">
        {isEmpty(members) ? (
          <ErrorStatus>No members found</ErrorStatus>
        ) : (
          <div className="flex flex-col gap-2 mb-2">
            {members.map((m) => (
              <Member key={m} address={m} />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => showModal(AddForm, { address: "", action: "add" })}
      >
        add member
      </button>
      <Submitter type="button" onClick={() => alert("submit")}>
        Submit
      </Submitter>
    </DivContainer>
  );
}
