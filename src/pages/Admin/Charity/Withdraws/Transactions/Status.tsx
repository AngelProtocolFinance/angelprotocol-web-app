import { ProposalStatus } from "types/contracts";

const bgColors: { [key in ProposalStatus]: string } = {
  pending: "bg-orange",
  executed: "bg-blue",
};

export default function Status({ status }: { status: ProposalStatus }) {
  return (
    <span
      className={`flex mx-auto w-fit p-2 rounded uppercase font-semibold text-xs text-white tracking-wider ${bgColors[status]}`}
    >
      {status}
    </span>
  );
}
