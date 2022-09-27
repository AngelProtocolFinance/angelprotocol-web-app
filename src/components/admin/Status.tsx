import { ProposalStatus } from "types/contracts";

export function Status(props: { status: ProposalStatus }) {
  return (
    <p
      className={`text-xs uppercase px-2 py-1 rounded-sm ${
        statusClasses[props.status]
      }`}
    >
      {props.status}
    </p>
  );
}
export const statusClasses: { [key in ProposalStatus]: string } = {
  executed: "bg-angel-blue/50",
  open: "bg-white text-angel-grey",
  passed: "bg-emerald-400",
  pending: "bg-orange",
  rejected: "bg-red-400/50",
};
