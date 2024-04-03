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
        className={`relative group w-full sm:w-40 rounded-t-lg py-2.5 text-sm font-medium leading-5
        focus:outline-none border-t border-x border-gray-l2 ${
          isReceived ? "bg-gray-l6 z-10" : "bg-gray-l4 hover:bg-gray-l5 -mr-4"
        }`}
      >
        <span
          className="group-focus-visible:outline-none group-focus-visible:rounded-sm 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          {"RECEIVED" satisfies DonationsQueryParams["status"]}
        </span>
        {isReceived && (
          // covers part of the below content's border to make it seem they are all part of the same component
          <div className="h-1 w-full bg-gray-l6 absolute -bottom-1" />
        )}
      </button>
      <button
        onClick={() => props.changeStatus("PENDING")}
        className={`relative group w-full sm:w-40 rounded-t-lg py-2.5 text-sm font-medium leading-5
        focus:outline-none border-t border-x border-gray-l2 ${
          !isReceived ? "bg-gray-l6 z-10" : "bg-gray-l4 hover:bg-gray-l5 -ml-4"
        }`}
      >
        <span
          className="group-focus-visible:outline-none group-focus-visible:rounded-sm 
        group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-d1"
        >
          {"PENDING" satisfies DonationsQueryParams["status"]}
        </span>
        {!isReceived && (
          // covers part of the below content's border to make it seem they are all part of the same component
          <div className="h-1 w-full bg-gray-l6 absolute -bottom-1" />
        )}
      </button>
    </div>
  );
}
