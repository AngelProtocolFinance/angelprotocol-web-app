import { TransactionStatus } from "types/lists";

export function Status(props: { status: TransactionStatus }) {
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
const statusClasses: { [key in TransactionStatus]: string } = {
  approved: "bg-blue",
  open: "bg-orange",
};
