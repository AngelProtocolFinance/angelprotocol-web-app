import Icon from "components/Icon";

export default function Toolbar() {
  return (
    <div className="col-span-2 grid grid-cols-[auto_1fr_auto] gap-x-3">
      <button className="w-28 btn-orange flex items-center justify-between rounded-md px-3 py-2 text-sm">
        <Icon type="Filter" size={20} />
        <span>Filter</span>
      </button>
      <div className="flex gap-2 items-center border border-gray-l2 rounded-md overflow-clip">
        <Icon type="Search" size={20} className="ml-2" />
        <input
          className="focus:outline-none w-full py-2 pr-3"
          placeholder="Search organizations..."
        />
      </div>
      <button className="flex items-center justify-between gap-3 w-36 text-sm py-2 px-3 border border-gray-l2 rounded-md uppercase">
        <span>sort by</span>
        <Icon type="ArrowDown" />
      </button>
    </div>
  );
}
