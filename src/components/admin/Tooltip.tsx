import Icon from "components/Icon";

type Props = { tooltip: string; classes?: string };
export function Tooltip({ classes = "", tooltip }: Props) {
  return (
    <div
      className={`${classes} flex gap-2 items-center text-orange-d2 dark:text-orange @container border border-orange-l2 dark:border-orange-l3/80 bg-orange-l4 dark:bg-bluegray-d2 text-sm p-3 rounded`}
    >
      <Icon type="Info" className="shrink-0 text-2xl @lg:text-base" />
      <span>{tooltip}</span>
    </div>
  );
}
