import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import { IoArrowForwardOutline } from "react-icons/io5"; //icon-arrow-right
import { RiPencilFill } from "react-icons/ri"; //icon-pencil
import { useEndowmentQuery } from "services/aws/aws";

interface Props {
  amount: number;
  classes?: string;
  periodNext: string;
  periodRemaining: string;
}
export function Schedule(props: Props) {
  const { id } = useAdminContext();
  const { showModal } = useModalContext();
  const { data: endow } = useEndowmentQuery({
    id,
    fields: ["allocation"],
  });

  const val = (pct?: number) =>
    pct || pct === 0 ? `$ ${humanize((pct / 100) * props.amount)}` : "---";

  function editAllocation() {}

  return (
    <div className="p-4 grid rounded border border-gray-l4 mt-4">
      <div className="flex flex-row items-center justify-between space-y-0">
        <h4 className="mb-1">Allocation Settings</h4>
        <button
          disabled={!endow}
          type="button"
          className="hover:text-blue disabled:text-gray"
          onClick={async () => {}}
        >
          <RiPencilFill className="h-4 w-4" />
          <span className="sr-only">Edit allocation settings</span>
        </button>
      </div>
      <p className="text-sm mb-4 text-gray">
        will take effect on: {props.periodNext}{" "}
        <span className="text-xs bg-gray text-white px-2 py-1 rounded">
          in {props.periodRemaining}
        </span>
      </p>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <IoArrowForwardOutline className="h-4 w-4 mr-2" />
          Grants
        </span>
        <span className="font-bold">
          {val(endow ? endow.allocation?.cash ?? 0 : undefined)}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <IoArrowForwardOutline className="h-4 w-4 mr-2" />
          Savings
        </span>
        <span className="font-bold">
          {val(endow ? endow.allocation?.cash ?? 50 : undefined)}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <IoArrowForwardOutline className="h-4 w-4 mr-2" />
          Investments
        </span>
        <span className="font-bold">
          {" "}
          {val(endow ? endow.allocation?.cash ?? 50 : undefined)}
        </span>
      </div>
    </div>
  );
}
