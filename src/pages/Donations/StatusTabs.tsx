import { DonationsQueryParams } from "types/aws";

type Props = {
  status: DonationsQueryParams["status"];
  changeStatus: (status: DonationsQueryParams["status"]) => void;
};

export default function StatusTabs(props: Props) {
  const isReceived = props.status === "RECEIVED";

  return (
    <div className="flex rounded-t-xl bg-blue-900/20">
      <button
        onClick={() => props.changeStatus("RECEIVED")}
        className={`relative group w-40 rounded-t-lg py-2.5 text-sm font-medium leading-5
        focus:outline-none focus:ring-2"
        border-t border-x ${
          isReceived ? "bg-gray-l5 z-10" : "bg-gray-l3 hover:bg-gray-l4 -mr-4"
        }`}
      >
        <span
          className="group-focus:outline-none group-focus:rounded-sm 
        group-focus:outline-2 group-focus:outline-offset-2 group-focus:outline-blue-d1"
        >
          {"RECEIVED" satisfies DonationsQueryParams["status"]}
        </span>
        {isReceived && (
          // covers part of the below content's border to make it seem they are all part of the same component
          <div className="h-1 w-full bg-gray-l5 absolute -bottom-1" />
        )}
      </button>
      <button
        onClick={() => props.changeStatus("PENDING")}
        className={`relative group w-40 rounded-t-lg py-2.5 text-sm font-medium leading-5
        focus:outline-none focus:ring-2"
        border-t border-x ${
          !isReceived ? "bg-gray-l5 z-10" : "bg-gray-l3 hover:bg-gray-l4 -ml-4"
        }`}
      >
        <span
          className="group-focus:outline-none group-focus:rounded-sm 
        group-focus:outline-2 group-focus:outline-offset-2 group-focus:outline-blue-d1"
        >
          {"PENDING" satisfies DonationsQueryParams["status"]}
        </span>
        {!isReceived && (
          // covers part of the below content's border to make it seem they are all part of the same component
          <div className="h-1 w-full bg-gray-l5 absolute -bottom-1" />
        )}
      </button>
    </div>
  );
}
