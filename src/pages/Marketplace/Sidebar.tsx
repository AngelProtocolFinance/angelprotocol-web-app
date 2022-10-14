import Icon from "components/Icon";

export default function Sidebar() {
  return (
    <div className="border-2 border-gray-l3 rounded-md grid content-start w-60">
      <div className="bg-orange-l5 font-heading flex items-center justify-between p-3">
        <h3 className="uppercase font-bold">filter by</h3>
        <button className="text-gray-d1 text-xs">Reset Filters</button>
      </div>
      <div className="p-3">
        <button className="uppercase text-xs font-heading font-bold flex items-center justify-between w-full">
          <span>SDG </span>
          <Icon type="ArrowDown" size={18} />
        </button>
      </div>
    </div>
  );
}
