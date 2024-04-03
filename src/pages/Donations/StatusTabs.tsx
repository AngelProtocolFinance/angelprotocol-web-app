import { DonationsQueryParams } from "types/aws";

type Props = {
  status: DonationsQueryParams["status"];
  changeStatus: (status: DonationsQueryParams["status"]) => void;
};

export default function StatusTabs(props: Props) {
  const isReceived = props.status === "RECEIVED";

  return (
    <div className="flex">
      <button
        onClick={() => props.changeStatus("RECEIVED")}
        className={`relative group w-full sm:w-40 rounded-t-lg py-2.5 text-sm font-bold leading-5
        focus:outline-none border-t border-x ${
          isReceived
            ? "bg-blue-l4 text-navy-d4 border-gray-l4 z-10"
            : "bg-gray-l3 hover:bg-gray-l5 text-white hover:text-current border-gray-l3 hover:border-gray-l4 -mr-4"
        }`}
      >
        <span
          className="group-focus-visible:outline-none group-focus-visible:rounded-sm 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          {"RECEIVED" satisfies DonationsQueryParams["status"]}
        </span>
      </button>
      <button
        onClick={() => props.changeStatus("PENDING")}
        className={`relative group w-full sm:w-40 rounded-t-lg py-2.5 text-sm font-bold leading-5
        focus:outline-none border-t border-x ${
          !isReceived
            ? "bg-blue-l4 text-navy-d4 border-gray-l4 z-10"
            : "bg-gray-l3 hover:bg-gray-l5 text-white hover:text-current border-gray-l3 hover:border-gray-l4 -ml-4"
        }`}
      >
        <span
          className="group-focus-visible:outline-none group-focus-visible:rounded-sm 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          {"PENDING" satisfies DonationsQueryParams["status"]}
        </span>
      </button>
    </div>
  );
}
