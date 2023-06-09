import { TransactionStatus } from "types/lists";

const bgColors: { [key in TransactionStatus]: string } = {
  open: "bg-orange",
  approved: "bg-blue",
};

export default function Status({ status }: { status: TransactionStatus }) {
  return (
    <span
      className={`flex mx-auto w-fit p-2 rounded uppercase font-semibold text-xs text-white tracking-wider ${bgColors[status]}`}
    >
      {status}
    </span>
  );
}
