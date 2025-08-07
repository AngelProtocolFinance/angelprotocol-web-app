import type { DonationsQueryParams } from "types/donations";

type Props = {
  status: DonationsQueryParams["status"];
  changeStatus: (status: DonationsQueryParams["status"]) => void;
};

export default function StatusTabs(props: Props) {
  return (
    <div className="inline-flex">
      <button
        onClick={() => props.changeStatus("final")}
        className={`relative group w-full sm:w-52 p-2.5 text-xs sm:text-sm font-bold leading-5
        focus:outline-hidden ${
          props.status === "final"
            ? "bg-blue-l4 z-20"
            : "bg-blue-l5 hover:bg-blue-l3 -mr-4"
        }`}
      >
        <span
          className="uppercase group-focus-visible:outline-hidden group-focus-visible:rounded-xs 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          Received
        </span>
      </button>
      <button
        onClick={() => props.changeStatus("pending")}
        className={`relative group w-full sm:w-52 p-2.5 text-xs sm:text-sm font-bold leading-5
        focus:outline-hidden ${
          props.status === "pending"
            ? "bg-blue-l4 z-20"
            : `bg-blue-l5 z-10 hover:bg-blue-l3 ${
                props.status === "final" ? "-ml-4" : "-mr-4"
              }`
        }`}
      >
        <span
          className="uppercase group-focus-visible:outline-hidden group-focus-visible:rounded-xs 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          Pending
        </span>
      </button>
      <button
        onClick={() => props.changeStatus("intent")}
        className={`relative group w-full sm:w-52 p-2.5 text-xs sm:text-sm font-bold leading-5
        focus:outline-hidden ${
          props.status === "intent"
            ? "bg-blue-l4 z-20"
            : "bg-blue-l5 hover:bg-blue-l3 -ml-4"
        }`}
      >
        <span
          className="uppercase group-focus-visible:outline-hidden group-focus-visible:rounded-xs 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          Awaiting Payment
        </span>
      </button>
    </div>
  );
}
