import { SortDirection, SortKey } from "./types";
import Icon from "components/Icon";

export function HeaderButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _sortDirection: SortDirection;
    _sortKey: SortKey;
    _activeSortKey: SortKey;
  }
) {
  const { _activeSortKey, _sortKey, _sortDirection, children, ...restProps } =
    props;
  return (
    <button
      {...restProps}
      className="flex items-center justify-start gap-1 uppercase relative"
    >
      <span>{children}</span>

      <Icon
        size={15}
        type={
          _activeSortKey === _sortKey
            ? _sortDirection === "asc"
              ? "Up"
              : "Down"
            : "Unsorted"
        }
        className={`absolute -right-4 ${
          _activeSortKey === _sortKey ? "text-angel-orange/90" : "text-white/30"
        }`}
      />
    </button>
  );
}
