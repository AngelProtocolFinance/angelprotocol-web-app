import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

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

      {_activeSortKey === _sortKey ? (
        _sortDirection === "asc" ? (
          <ChevronUp className="w-4 h-4 shrink-0 text-navy-d4" />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 text-navy-d4" />
        )
      ) : (
        <ChevronsUpDown className="w-4 h-4 shrink-0 text-navy-l2" />
      )}
    </button>
  );
}
