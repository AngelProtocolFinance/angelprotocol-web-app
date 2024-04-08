import { DonationsQueryParams } from "types/aws";

type Props = {
  status: DonationsQueryParams["status"];
  changeStatus: (status: DonationsQueryParams["status"]) => void;
};

export default function StatusTabs(props: Props) {
  return (
    <div className="flex">
      <button
        onClick={() => props.changeStatus("final")}
        className={`relative group w-full sm:w-40 rounded-t-lg py-2.5 text-sm font-bold leading-5
        focus:outline-none border-t border-x border-gray-l4 ${
          props.status === "final"
            ? "bg-blue-l4 z-10"
            : "bg-blue-l5 hover:bg-blue-l3 -mr-4"
        }`}
      >
        <span
          className="uppercase group-focus-visible:outline-none group-focus-visible:rounded-sm 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          Received
        </span>
      </button>
      <button
        onClick={() => props.changeStatus("pending")}
        className={`relative group w-full sm:w-40 rounded-t-lg py-2.5 text-sm font-bold leading-5
        focus:outline-none border-t border-x border-gray-l4 ${
          props.status === "pending"
            ? "bg-blue-l4 z-10"
            : "bg-blue-l5 hover:bg-blue-l3 -ml-4"
        }`}
      >
        <span
          className="uppercase group-focus-visible:outline-none group-focus-visible:rounded-sm 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          Pending
        </span>
      </button>
    </div>
  );
}
