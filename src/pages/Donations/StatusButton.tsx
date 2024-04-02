import { DonationsQueryParams } from "types/aws";

type Props = {
  selected: boolean;
  status: DonationsQueryParams["status"];
  clickHandler: (status: DonationsQueryParams["status"]) => void;
};

export default function StatusButton({
  selected,
  status,
  clickHandler,
}: Props) {
  return (
    <button
      onClick={() => clickHandler(status)}
      className={`w-40 rounded-t-lg py-2.5 text-sm font-medium leading-5 ring-white/60 
      ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" ${
        selected
          ? "bg-gray-l4 border-t border-x"
          : "bg-gray-l5 border-t border-x text-blue-100 hover:text-white"
      }
      `}
    >
      {status}
    </button>
  );
}
