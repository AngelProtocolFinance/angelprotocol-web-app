import Icon from "components/Icon";

export function HeaderButton<T>(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _sortDirection: "asc" | "desc";
    _sortKey: keyof T;
    _activeSortKey: keyof T;
  }
) {
  const {
    _activeSortKey,
    _sortKey,
    _sortDirection,
    children,
    className,
    ...restProps
  } = props;
  return (
    <button
      {...restProps}
      className={`${className} flex items-center justify-between gap-1 uppercase`}
    >
      <span>{children}</span>

      <Icon
        type={
          _activeSortKey === _sortKey
            ? _sortDirection === "asc"
              ? "ChevronUp"
              : "ChevronDown"
            : "ChevronsUpDown"
        }
        className={`w-4 h-4 shrink-0 ${
          _activeSortKey === _sortKey
            ? "text-navy-d4 dark:text-white"
            : "text-navy-l2 dark:text-white"
        }`}
      />
    </button>
  );
}
