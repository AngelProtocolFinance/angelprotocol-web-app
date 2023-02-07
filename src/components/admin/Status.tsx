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
  executed: "bg-blue",
  open: "bg-white text-gray-d2 border border-gray-l3 dark:border-none",
  passed: "bg-green-l1",
  pending: "bg-orange",
  rejected: "bg-red-l1",
};
