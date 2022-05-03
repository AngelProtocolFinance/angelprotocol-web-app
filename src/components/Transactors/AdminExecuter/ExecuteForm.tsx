import { TagPayloads } from "services/transaction/types";
import useExecuteProposal from "./useExecuteProposal";

export type Props = {
  proposal_id: number;
  tagPayloads?: TagPayloads;
};
export default function ExecuteForm(props: Props) {
  const { executeProposal } = useExecuteProposal(
    props.proposal_id,
    props.tagPayloads
  );
  return (
    <div className="bg-white grid justify-items-center p-4 rounded-md w-full">
      <p className="text-angel-grey">
        Are you sure you want to execute this poll?
      </p>
      <button
        type="button"
        className="rounded-md bg-angel-orange text-white hover:text-angel-grey font-heading px-4 py-1 text-xs uppercase font-bold mt-4"
        onClick={executeProposal}
      >
        confirm
      </button>
    </div>
  );
}
