import Icon from "@giving/components/Icon";
import { SortDirection, SortKey } from "@giving/types/pages/admin";

export default function Header(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    sortDirection: SortDirection;
    sortKey: SortKey;
    activeSortKey: SortKey;
  }
) {
  const { activeSortKey, sortKey, sortDirection, children, ...restProps } =
    props;
  return (
    <button
      {...restProps}
      className="w-full flex items-center justify-start gap-1 uppercase font-heading font-semibold text-sm"
    >
      <span>{children}</span>
      {activeSortKey === sortKey && (
        <Icon type={sortDirection === "asc" ? "Up" : "Down"} />
      )}
    </button>
  );
}
