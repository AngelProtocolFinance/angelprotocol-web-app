import { TransactionStatus } from "types/lists";

export function Status(props: { status: TransactionStatus }) {
  return (
    <p
      className={`text-center text-xs font-semibold uppercase px-2 py-1 rounded-sm ${
        statusClasses[props.status]
      }`}
    >
      {props.status}
    </p>
  );
}
const statusClasses: { [key in TransactionStatus]: string } = {
  executed: "bg-blue",
  pending: "bg-orange",
};
