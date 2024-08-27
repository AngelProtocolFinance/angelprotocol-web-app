import { IoArrowForwardOutline } from "react-icons/io5"; //icon-arrow-right
import { RiPencilFill } from "react-icons/ri"; //icon-pencil

interface Props {
  classes?: string;
  periodNext: string;
  periodRemaining: string;
}
export function Schedule(props: Props) {
  return (
    <div className="p-4 grid rounded border border-gray-l4 mt-4">
      <div className="flex flex-row items-center justify-between space-y-0">
        <h4 className="mb-1">Allocation Settings</h4>
        <button className="h-8 w-8 p-0">
          <RiPencilFill className="h-4 w-4" />
          <span className="sr-only">Edit allocation settings</span>
        </button>
      </div>
      <p className="text-sm mb-4 text-gray">
        Will take effect on: {props.periodNext}{" "}
        <span className="text-xs bg-gray text-white px-2 py-1 rounded">
          in {props.periodRemaining}
        </span>
      </p>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <IoArrowForwardOutline className="h-4 w-4 mr-2" />
          Grants
        </span>
        <span className="font-bold">$20,000</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <IoArrowForwardOutline className="h-4 w-4 mr-2" />
          Savings
        </span>
        <span className="font-bold">$20,000</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <IoArrowForwardOutline className="h-4 w-4 mr-2" />
          Investments
        </span>
        <span className="font-bold">$60,000</span>
      </div>
    </div>
  );
}
