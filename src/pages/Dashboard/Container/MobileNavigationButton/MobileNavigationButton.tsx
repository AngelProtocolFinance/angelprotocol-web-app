import { LinkGroup } from "../../types";
import Icon from "components/Icon";
import useMobileSidebar from "./useMobileSidebar";

type Props = { className?: string; linkGroups: LinkGroup[] };

export default function MobileNavigationButton({
  className = "",
  linkGroups,
}: Props) {
  const { open, activeLink } = useMobileSidebar(linkGroups);

  return (
    <button
      type="button"
      onClick={open}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-prim font-bold text-sm text-orange ${className}`}
    >
      <Icon type={activeLink.icon} size={24} />
      {activeLink.title}
      <Icon type="ArrowRight" size={24} className="ml-auto" />
    </button>
  );
}
