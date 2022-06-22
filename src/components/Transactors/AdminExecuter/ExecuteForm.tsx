import { AdmiExecuterProps } from "./types";
import useExecuteProposal from "./useExecuteProposal";

export default function ExecuteForm(props: AdmiExecuterProps) {
  const { executeProposal } = useExecuteProposal(props);
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
