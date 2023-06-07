import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { ErrorStatus } from "components/Status";
import { isEmpty } from "helpers";
import { useAdminResources } from "../../../Guard";
import AddForm from "./Adder";
import Member from "./Member";

export default function Members() {
  const { members } = useAdminResources();
  const { showModal } = useModalContext();
  return (
    <div className="grid content-start border border-prim rounded p-8">
      <h4 className="text-2xl font-body mb-8">Members</h4>
      <button
        className="btn-outline-filled justify-self-end mb-5 text-sm flex gap-x-3"
        onClick={() => showModal(AddForm, { address: "", action: "add" })}
      >
        <Icon type="Plus" />
        <span>add member</span>
      </button>
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
    </div>
  );
}
