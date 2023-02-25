import Icon from "@giving/components/Icon";
import { SortDirection, SortKey } from "@giving/hooks/useSort";

export default function HeaderButton(
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
        className={`absolute -right-6 ${
          _activeSortKey === _sortKey
            ? "text-gray-d2 dark:text-white"
            : "text-gray dark:text-white"
        }`}
      />
    </button>
  );
}
