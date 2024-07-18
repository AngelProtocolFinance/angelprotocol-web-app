import Icon from "components/Icon";
import { useMarketplaceContext } from "../Context";

export default function Search({ classes = "" }: { classes?: string }) {
  const { state, update } = useMarketplaceContext();

  return (
    <div
      className={`${classes} flex gap-2 items-center rounded-lg overflow-clip field-container`}
    >
      <Icon type="Search" size={20} className="ml-2" />
      <input
        value={state.searchText}
        onChange={(e) => update({ searchText: e.target.value })}
        className="w-full py-2 pr-3 placeholder:text-navy-l3 text-navy-d4 font-medium font-heading"
        placeholder="Search organizations..."
      />
    </div>
  );
}
