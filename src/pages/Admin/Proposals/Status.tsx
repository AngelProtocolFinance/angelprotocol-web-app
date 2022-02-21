import { ProposalStatus } from "services/terra/admin/types";

export default function Status(props: { status: ProposalStatus }) {
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
  executed: "bg-angel-blue bg-opacity-50",
  open: "bg-white text-angel-grey",
  passed: "bg-green-300",
  pending: "bg-angel-orange",
  rejected: "bg-red-400 bg-opacity-50",
};
