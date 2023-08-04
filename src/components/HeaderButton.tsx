import { DonationRecord } from "types/aws";
import { SortDirection } from "services/apes";
import Icon from "components/Icon";

export function HeaderButton<T extends DonationRecord>(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _sortDirection: SortDirection;
    _sortKey: keyof T;
    _activeSortKey: keyof T;
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
