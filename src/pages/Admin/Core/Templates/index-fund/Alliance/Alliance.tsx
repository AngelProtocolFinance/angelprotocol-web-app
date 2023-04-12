import { useContractQuery } from "services/juno";
import { useModalContext } from "contexts/ModalContext";
import QueryLoader from "components/QueryLoader";
import { DivContainer, FormError, FormSkeleton } from "components/admin";
import Adder from "./Editor";
import Member from "./Member";

export default function Alliance() {
  const { showModal } = useModalContext();

  const query = useContractQuery("index-fund.alliance-members", {
    startAfter: 0,
    limit: 10,
  });

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <FormSkeleton />,
        error: <FormError errorMessage="Failed to load alliance members" />,
      }}
    >
      {(members) => (
        <DivContainer classes="">
          <h3>Alliance members</h3>

          <button
            type="button"
            onClick={() => {
              showModal(Adder, { address: "", action: "add" });
            }}
            className="btn-outline-filled text-sm justify-self-end py-2 px-3 -mb-2"
          >
            add member
          </button>
          <div className="grid content-start gap-3 p-3 rounded border border-prim">
            {members.map((m, i) => (
              <Member key={i} address={m} />
            ))}
          </div>
        </DivContainer>
      )}
    </QueryLoader>
  );
}
